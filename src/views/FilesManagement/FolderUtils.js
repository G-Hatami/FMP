export const buildFolderTree = (folders) => {
    const folderMap = new Map();
    const tree = [];

    folders.forEach(folder => {
        folder.children = [];
        folderMap.set(folder.path, folder);
    });

    folders.forEach(folder => {

        let parentPath;
        const slashCount = (folder.path.match(/\//g) || []).length;
        if (slashCount === 1) {
            parentPath = null;
        } else {
            parentPath = folder.path.slice(0, folder.path.lastIndexOf('/'));
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

    console.log("tree it is", tree);
    return tree;
};
