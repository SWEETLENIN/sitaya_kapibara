//функция обновления дерева (добавление детей к определенному key)
const updateTreeData = (list, key, children) => {

   //проход по каждому узлу дерева и встраивание детей, если совпадает key
   const newTree = list.map((node) => {
        if (node.key === key) {
          return { ...node, children };
        }

        if (node.children) {
          return { ...node, children: updateTreeData(node.children, key, children) };
        }

        return node;
   });
   return newTree;
};

export default updateTreeData;
