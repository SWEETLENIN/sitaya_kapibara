import smtplib  # Импортируем библиотеку по работе с SMTP
import os  # Функции для работы с операционной системой, не зависящие от используемой операционной системы

# Добавляем необходимые подклассы - MIME-типы
import mimetypes  # Импорт класса для обработки неизвестных MIME-типов, базирующихся на расширении файла
from email import encoders  # Импортируем энкодер
from email.mime.base import MIMEBase  # Общий тип
from email.mime.text import MIMEText  # Текст/HTML
from email.mime.image import MIMEImage  # Изображения
from email.mime.audio import MIMEAudio  # Аудио
from email.mime.multipart import MIMEMultipart  # Многокомпонентный объект
from backend.settings.smtp_config import SMTP_CONFIG

class SMTPmail:
    @classmethod
    def send_email(cls, addr_to, msg_subj, msg_text, files):
        addr_from = SMTP_CONFIG.address

        msg = MIMEMultipart()  # Создаем сообщение
        msg['From'] = addr_from  # Адресат
        msg['To'] = ', '.join(addr_to)  # Получатели
        msg['Subject'] = msg_subj  # Тема сообщения

        body = msg_text  # Текст сообщения
        msg.attach(MIMEText(body, 'plain'))  # Добавляем в сообщение текст

        cls.process_attachement(msg, files)

        # ======== Этот блок настраивается для каждого почтового провайдера отдельно ===============================================
        server = smtplib.SMTP(SMTP_CONFIG.host, SMTP_CONFIG.port)  # Создаем объект SMTP
        # server.starttls()                                      # Начинаем шифрованный обмен по TLS
        # server.set_debuglevel(True)                            # Включаем режим отладки, если не нужен - можно закомментировать
        server.send_message(msg)  # Отправляем сообщение
        server.quit()  # Выходим
        # ==========================================================================================================================

    @classmethod
    def process_attachement(cls, msg, files):  # Функция по обработке списка, добавляемых к сообщению файлов
        for f in files:
            if os.path.isfile(f['file_path']):  # Если файл существует
                cls.attach_file(msg, f)  # Добавляем файл к сообщению
            elif os.path.exists(f['file_path']):  # Если путь не файл и существует, значит - папка
                dir = os.listdir(f['file_path'])  # Получаем список файлов в папке
                for file in dir:  # Перебираем все файлы и...
                    cls.attach_file(msg, f + "/" + file)  # ...добавляем каждый файл к сообщению

    @classmethod
    def attach_file(cls, msg, filepath):  # Функция по добавлению конкретного файла к сообщению
        filename = filepath['file_name']  # Получаем только имя файла
        ctype, encoding = mimetypes.guess_type(filepath['file_name'])  # Определяем тип файла на основе его расширения
        if ctype is None or encoding is not None:  # Если тип файла не определяется
            ctype = 'application/octet-stream'  # Будем использовать общий тип
        maintype, subtype = ctype.split('/', 1)  # Получаем тип и подтип
        if maintype == 'text':  # Если текстовый файл
            with open(filepath['file_path']) as fp:  # Открываем файл для чтения
                file = MIMEText(fp.read(), _subtype=subtype)  # Используем тип MIMEText
                fp.close()  # После использования файл обязательно нужно закрыть
        elif maintype == 'image':  # Если изображение
            with open(filepath['file_path'], 'rb') as fp:
                file = MIMEImage(fp.read(), _subtype=subtype)
                fp.close()
        elif maintype == 'audio':  # Если аудио
            with open(filepath['file_path'], 'rb') as fp:
                file = MIMEAudio(fp.read(), _subtype=subtype)
                fp.close()
        else:  # Неизвестный тип файла
            with open(filepath['file_path'], 'rb') as fp:
                file = MIMEBase(maintype, subtype)  # Используем общий MIME-тип
                file.set_payload(fp.read())  # Добавляем содержимое общего типа (полезную нагрузку)
                fp.close()
                encoders.encode_base64(file)  # Содержимое должно кодироваться как Base64
        file.add_header('Content-Disposition', 'attachment', filename=filename)  # Добавляем заголовки
        msg.attach(file)  # Присоединяем файл к сообщению
