export const objectTrimmer = (object) =>{
    for (let key in object) {
        if (typeof object[key]=== "string"){
            object[key]=object[key].trim()
        }
    }
    return object
}