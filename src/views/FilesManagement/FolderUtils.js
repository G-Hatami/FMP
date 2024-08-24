export const buildFolderTree = (folders) => {
    const folderMap = new Map();
    const tree = [];
    folders.forEach(folder => {
        folder.children = [];
        folderMap.set(folder.path, folder);
    });
    // console.log("map it is", folderMap)
    folders.forEach(folder => {
        let parentPath;
        if (folder.path === "/") {
            parentPath = null
            // console.log("we want / noww", folder.name)
        } else if (folder.path.slice(0, folder.path.lastIndexOf("/")) === "") {
            parentPath = "/";
            // console.log("parent path for first level", parentPath)
        } else {
            console.log("")
            parentPath = folder.path.slice(0, folder.path.lastIndexOf("/"))
            // console.log("parent path for next level", parentPath)
        }

        if (parentPath) {
            const parentFolder = folderMap.get(parentPath);
            if (parentFolder) {
                parentFolder.children.push(folder);
            }
        } else {
            tree.push(folder);
        }
    });
    // console.log("tree it is", tree);
    return tree;
};


export const buildTree = (allFolders, allFiles) => {
    const allFoldersMap = new Map()
    const filesTree = [];


    //every folder should have a children and we set them in map to find them
    allFolders.forEach(folder => {
            folder.children = []
            allFoldersMap.set(folder.path, folder)
        }
    )

    allFolders.forEach(folder => {
        let theParentPath;
        //first folder  is "all files folder" so this is the true parent
        if (folder.path === "/") {
            theParentPath = null
            console.log("we want / noww", folder.name)

            //first level folders
        } else if (folder.path.slice(0, folder.path.lastIndexOf("/")) === "") {
            theParentPath = "/";
            console.log("parent path for first level", theParentPath)


            //other folders find their parent
        } else {
            console.log("")
            theParentPath = folder.path.slice(0, folder.path.lastIndexOf("/"))
            console.log("parent path for next level", theParentPath)
        }


        // when we get here we know we find the folder's parent
        //if it is not the root , we will insert it to it's parent
        if (theParentPath) {
            const parentFolder = allFoldersMap.get(theParentPath);
            if (parentFolder) {
                parentFolder.children.push(folder);
            }
        } else {
            filesTree.push(folder);
        }


    })
    allFiles.forEach(file => {
        let parentPathFile = allFoldersMap.get(file.path)
        if (parentPathFile) {
            console.log("parent path for file is", parentPathFile)
            parentPathFile.children.push(file)
        }
    })

    console.log("tree it is", filesTree)
    return filesTree

}
