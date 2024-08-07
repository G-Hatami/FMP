<template>
  <div>
    <div class="first-container">
      <div class="button">
        <button @click="showDialogs('isCreateDialogOpen' , 'create-folder')" id="create-button"><i
            class="fa-solid fa-folder-plus"></i><br>
          create folder
        </button>
        <input type="file" style="display: none" id="upload" multiple @change="handleUploadFile"
               :disabled="viewState === 'folders'">
        <button id="upload-button" onclick="document.getElementById('upload').click()"><i
            class="fa-solid fa-cloud-arrow-up"></i><br> upload file
        </button>
        <button @click="showDialogs('isShareProcessDialogOpen' , 'share-process')" id="shared-button"><i
            class="fa-solid fa-share-nodes"></i>shared/share
        </button>
        <button id="display-button" @click="changeView('allFiles')">Show All Files</button>
        <button id="display-button" @click="changeView('folders')">Show All Folders</button>
        <div id="view">
          <button @click="toggleList"><img width="30" height="30"
                                           src="https://img.icons8.com/ios-filled/50/fcfcfc/list.png" alt="list"/>
          </button>
          <button @click="toggleGrid"><img width="30" height="30"
                                           src="https://img.icons8.com/ios-filled/50/fcfcfc/grid.png" alt="grid"/>
          </button>
        </div>

      </div>
      <div class="separator">
        <h1>{{ headerText }}</h1>
        <div class="line"></div>
      </div>
    </div>
    <div v-if="anyFileSelected" class="features">
      <button @click="showDialogs('isDeleteDialogOpen' , 'delete-file')" style="color: #1e293b "><i
          class="fa-solid fa-trash"></i>Delete
      </button>
      <button @click="showDialogs('isShareDialogOpen' , 'share-file' )" style="color: #1e293b "><i
          class="fa-solid fa-share-from-square"></i>Share
      </button>
      <button @click="showDialogs('isCopyDialogOpen' , 'copy-file' )" style="color: #1e293b "><i
          class="fa-solid fa-copy"></i>Copy
      </button>
      <button @click="downloadFile()" style="color: #1e293b "><i class="fa-solid fa-download"></i>Download
      </button>
      <button @click="showDialogs('isMoveDialogOpen' , 'move-file')" style="color: #1e293b "><i
          class="fa-solid fa-arrow-right"></i>Move
      </button>
      <button @click="closeFeatures" id="cancel-selection"><i class="fa-solid fa-xmark"></i> {{ selectedFiles.length }}
        selected
      </button>
    </div>
    <div class="second-container">
      <div v-if="hasFiles && viewState === 'allFiles' && gridView === true" class="file-container"
           id="myFilesContainer">
        <div v-for="file in getAllFiles" :key="file" class="file-item">
          <div class="icon-container">
            <img alt="/" :src="getFileIcon(file.name)" class="file-icon"/>
            <input @change="toggleShowOptions" class="file-checkbox" type="checkbox" :value="file"
                   v-model="selectedFiles"/>
          </div>
          <div class="url-container">
            <a :download="file.name+'.txt'" :href="file.url">{{ getShortenedName(file.name) }}</a>
            <p>{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
      </div>
      <div v-else-if="viewState === 'allFiles' && gridView === true" class="placeholder-container">
        <p>No files to display. Upload or share files to see them here.</p>
      </div>
      <div v-else-if="listView === true && viewState === 'allFiles' ">
        <div class="list-elements">
          <div class="root" @click="toggleSubOptions">All Files ( / )</div>
          <div class="children">
            <div class="children-1" style="color: #dddddd" v-for="file in currentAllFiles" v-if="isSubOpen">
              <div>
                <input @change="toggleShowOptions" type="checkbox" class="inputInList" :value="file"
                       v-model="selectedFiles"/>
                <i class="fa-solid fa-file" style="color: #f2f2f2;"></i> <a style="color: #dddddd"
                                                                            :download="file.name+'.txt'"
                                                                            :href="file.url">
                {{ getShortenedName(file.name) }}</a>
              </div>
            </div>

            <div class="children-1" v-if="isSubOpen" v-for="folder in currentFolders">
              <img @click="toggleFolder(folder)" width="20" height="20"
                   src="https://img.icons8.com/ios-glyphs/100/fcfcfc/expand-arrow--v1.png"
                   alt="expand-arrow--v1"/> <i class="fa-solid fa-folder"></i>
              {{ folder }}
              <transition name="fade">
                <div class="folder-content" v-if="isFolderOpen(folder)">
                  <div v-for="file in getFilesInFolder(folder)" :key="file.name" class="file-item">
                    <input @change="toggleShowOptions" type="checkbox" class="inputInList" :value="file"
                           v-model="selectedFiles"/>
                    <a style="color: #dddddd"
                       :download="file.name+'.txt'"
                       :href="file.url">{{ getShortenedName(file.name) }}</a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>


      <div class="folder-container" id="createdFoldersContainer" v-if="viewState === 'folders'">
        <div v-for="folder in getAllFolders" :key="folder" class="folders-item">
          <div class="folderIcon">
            <img src="/src/assets/folder.svg" alt="/">
          </div>
          <div class="nameContainer" @click="changeView('folder', folder)">
            {{ folder }}
          </div>
        </div>
      </div>
      <div class="fileInFolder-container" v-show="viewState ===  'folder'">
        <div style="color: #dddddd" class="folder-item" v-for="f in getAllFilesInFolder" :key="f.name">
          <div class="icon-container">
            <img alt="/" :src="getFileIcon(f.name)" class="file-icon"/>
            <input @change="toggleShowOptions" class="file-checkbox" type="checkbox"
                   :value="f" v-model="selectedFiles"/>
          </div>
          <div class="url-container">
            <a :download="f.name+'.txt'" :href="f.url" target="_blank">{{ getShortenedName(f.name) }}</a>
            <p>{{ formatFileSize(f.size) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialog id="create-folder" v-if="isCreateDialogOpen">
    <h2><i class="fa-solid fa-folder"></i> Create new folder</h2>
    <input placeholder="Enter folder name" class="folder-name" type="text" v-model="folderName" required>
    <button id="cross-button"><i class="fa-solid fa-xmark"
                                 @click="closeDialogs('isCreateDialogOpen' , 'create-folder')"></i></button>
    <div class="create-buttons">
      <button id="cancelBtn" @click="closeDialogs('isCreateDialogOpen' , 'create-folder')">cancel</button>
      <button id="createBtn" @click="createFolder(folderName)">create</button>
    </div>
  </dialog>
  <dialog id="delete-file" class="deleteDialog" v-if="isDeleteDialogOpen">
    <button @click="closeDialogs('isDeleteDialogOpen' , 'delete-file')" id="cross-button"><i
        class="fa-solid fa-xmark"></i></button>
    <h2><i class="fa-solid fa-circle-exclamation" style="color: #64748b;"></i>Delete items?</h2><br>
    <p>Are You sure you want to delete files ? </p>
    <div class="deleteBtn">
      <button id="cancelBtn2" @click="closeDialogs('isDeleteDialogOpen' , 'delete-file')">Cancel</button>
      <button id="deleteBtn" @click="deleteSelections">Delete</button>
    </div>
  </dialog>


  <dialog id="copy-file" class="copyDialog" v-if="isCopyDialogOpen">
    <button @click="closeDialogs('isCopyDialogOpen', 'copy-file')" id="cross-button">
      <i class="fa-solid fa-xmark" style="color: #1e293b"></i>
    </button>
    <div class="destinationList">
      <table>
        <tbody style="color:black">
        <tr v-for="folder in getAllFolders" :key="folder"
            :class="{ selected: desFolder === folder }"
            @click="selectDesFolder(folder)">
          <td>{{ folder }}</td>
        </tr>
        <tr :class="{ selected: desFolder === 'ALL FILES' }"
            @click="selectDesFolder('ALL FILES')">
          <td>ALL FILES</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="dialog-buttons">
      <button @click="copyHere">copy here</button>
      <button @click="closeDialogs('isCopyDialogOpen', 'copy-file')">cancel</button>
    </div>
  </dialog>


  <dialog id="move-file" class="moveDialog" v-if="isMoveDialogOpen">
    <button @click="closeDialogs('isMoveDialogOpen' , 'move-file')" id="cross-button"><i class="fa-solid fa-xmark"
                                                                                         style="color: #1e293b"></i>
    </button>
    <div class="destinationList">
      <table>
        <tbody style="color:black">
        <tr v-for="folder in getAllFolders" :key="folder"
            :class="{ selected: desFolder === folder }"
            @click="selectDesFolder(folder)">
          <td>{{ folder }}</td>
        </tr>
        <tr :class="{ selected: desFolder === 'ALL FILES' }"
            @click="selectDesFolder('ALL FILES')">
          <td>ALL FILES</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="dialog-buttons">
      <button @click="moveHere">Move Here</button>
      <button @click="closeDialogs('isMoveDialogOpen', 'move-file')">cancel</button>
    </div>
  </dialog>
  <dialog id="share-file" class="shareDialog" v-if="isShareDialogOpen">
    <button @click="closeDialogs('isShareDialogOpen' , 'share-file')" id="cross-button"><i class="fa-solid fa-xmark"
                                                                                           style="color: #1e293b"></i>
    </button>
    <div class="destinationList">
      <table>
        <tbody style="color:black">
        <tr v-for="user in userStore.users.filter(u => u.username !== userStore.currentUser.username)"
            :key="user.username" :class="{ selected: isSelected(user) }">
          <td>
            <input
                type="checkbox"
                :value="user"
                v-model="desSelections"
            />
            {{ user.username }}
          </td>
        </tr>
        <tr>
          <td>Groups:</td>
        </tr>
        <tr v-for="group in userStore.groups" :key="group.groupName" :class="{ selected: isSelected(group) }">
          <td>
            <input
                type="checkbox"
                :value="group"
                v-model="desSelections"
            />
            {{ group.groupName }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="dialog-buttons">
      <button @click="share">Share</button>
      <button @click="closeDialogs('isShareDialogOpen', 'share-file')">cancel</button>
    </div>
  </dialog>
  <dialog v-if="isShareProcessDialogOpen" class="shareProcessDialog" id="share-process">
    <button @click="closeDialogs('isShareProcessDialogOpen', 'share-process')" id="cross-button">
      <i class="fa-solid fa-xmark" style="color: #1e293b"></i>
    </button>
    <div class="tabs">
      <a href="#" :class="{active: currentTab === 'shareWithMe'}" @click.prevent="currentTab = 'shareWithMe'">
        Share With Me
      </a>
      <a href="#" :class="{active: currentTab === 'shareByMe'}" @click.prevent="currentTab = 'shareByMe'">
        Share By Me
      </a>
    </div>
    <div style="color: black" class="tabContent">
      <div v-if="currentTab ==='shareWithMe'" class="shareWithMeContent">
        <div>
          <table>
            <thead>
            <tr>
              <th>Owner</th>
              <th>Name</th>
              <th>URl</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="file in currentSharedWithMe">
              <td>{{ file.owner }}</td>
              <td>{{ file.name }}</td>
              <td>{{ file.url }}</td>
            </tr>

            </tbody>
          </table>
        </div>

      </div>
      <div v-if="currentTab ==='shareByMe'" class="shareByMeContent">
        <div class="tableContainer">
          <table>
            <thead>
            <tr>
              <th>File Name</th>
              <th>Share with</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="file in currentFiles" :key="file" style="display: flex;">
              <td>{{ file.name }}
              </td>
              <td>
                <div v-for="f in file.shareWith" :key="f">{{ f }}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </dialog>

</template>


<script setup>
import {useUserStore} from "../../stores/userStore";
import {computed, ref} from "vue";

const currentAllFiles = computed(() => {
  return currentFiles.value.filter(file => file.folder === "/")
})
const currentFiles = computed(() => {
  return userStore.users.find(u => u.username === userStore.currentUser.username).allFiles.userFiles
})
const currentFolders = computed(() => {
  return userStore.users.find(u => u.username === userStore.currentUser.username).allFiles.folders
})
const currentSharedWithMe = computed(() => {
  return userStore.users.find(u => u.username === userStore.currentUser.username).allFiles.sharedWithMe
})
const getFilesInFolder = (folder) => {
  return currentFiles.value.filter(file => file.folder === `/${folder}`);
}
const toggleList = () => {
  gridView.value = false
  listView.value = true
}
const toggleGrid = () => {
  listView.value = false
  gridView.value = true
}
const toggleFolder = (folder) => {
  const index = openedFolders.value.findIndex(f => f === folder)
  if (index !== -1) {
    openedFolders.value.splice(index, 1)
  } else {
    openedFolders.value.push(folder)
  }
  console.log("opened one", openedFolders.value)
}
const isFolderOpen = (folder) => {
  return Array.from(openedFolders.value).find(f => f === folder)
}
//

const userStore = useUserStore()
const isCreateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCopyDialogOpen = ref(false)
const isMoveDialogOpen = ref(false)
const isShareDialogOpen = ref(false)
const isShareProcessDialogOpen = ref(false)
const selectedFiles = ref([])
const showOptions = ref(false)
const headerText = ref("My Files")
const viewState = ref("allFiles")
const listView = ref(false)
const gridView = ref(true)
const folderName = ref()
const selectedFolderName = ref()
const desFolder = ref(null)
const desSelections = ref([])
const currentTab = ref('shareWithMe')
const isSubOpen = ref(false)
const openedFolders = ref([])
const selectedFilesArray = computed(() =>
    Array.from(selectedFiles.value))
const anyFileSelected = computed(() => {
  return selectedFiles.value.length > 0;
})
const toggleSubOptions = () => {
  isSubOpen.value = !isSubOpen.value
  console.log(isSubOpen.value)
}

const isSelected = (item) => {
  const arr = Array.from(desSelections.value)
  return arr.some(u =>
      (u.username && u.username === item.username) ||
      (u.groupName && u.groupName === item.groupName)
  );
};

const share = () => {
  const desSelectionsArray = Array.from(desSelections.value)
  const userIndex = userStore.users.findIndex(user => user.username === userStore.currentUser.username);
  console.log(selectedFiles.value)
  console.log(desSelections.value)
  userStore.users[userIndex].allFiles.userFiles.forEach(file => {
        selectedFilesArray.value.forEach(selected => {
          if (selected.name === file.name) {
            desSelectionsArray.forEach(des => {
                  if (!file.shareWith.includes(des.username))
                    file.shareWith.push(
                        des.username
                    )
                }
            )
          }
        })
      }
  )
  userStore.users.forEach(user => {
    desSelectionsArray.forEach(des => {
      if (user.username === des.username) {
        selectedFilesArray.value.forEach(selected => {
          user.allFiles.sharedWithMe.push(selected)
        })
      }
    })

  })
  console.log(userStore.users)
  console.log("updated store:", userStore.users[userIndex].allFiles.userFiles)
  closeDialogs("isShareDialogOpen", "share-file")
  selectedFiles.value = []
}
const copyHere = () => {
  const userIndex = userStore.users.findIndex(user => user.username === userStore.currentUser.username);
  const destination = desFolder.value === "ALL FILES" ? "/" : `/${desFolder.value}`
  console.log(destination)
  const filesArray = Array.from(selectedFiles.value);
  const filesToCopy = filesArray.map(file => {
    let count = 0;
    const toDeleteDuplicates = userStore.users[userIndex].allFiles.userFiles.filter(f => f.folder === destination)
    console.log(toDeleteDuplicates)

    toDeleteDuplicates.forEach(f => {
      if (f.name.startsWith(file.name)) {
        count++;
      }
    });
    const fileNameWithCount = count > 0 ? `${file.name}(${count})` : file.name;
    const objectURL = window.URL.createObjectURL(new File([""], {type: "text/plain"}));
    return {
      name: fileNameWithCount,
      url: objectURL,
      size: file.size,
      folder: destination,
      shareWith: file.shareWith || []
    };
  })
  console.log(Array.from(filesToCopy))
  filesToCopy.forEach(file => {
    userStore.users[userIndex].allFiles.userFiles.push(file);
  })

  console.log("updated user files ", userStore.users[userIndex].allFiles.userFiles)
  closeDialogs("isCopyDialogOpen", "copy-files")
}
const moveHere = () => {
  const userIndex = userStore.users.findIndex(user => user.username === userStore.currentUser.username);
  const destination = desFolder.value === "ALL FILES" ? "/" : `/${desFolder.value}`
  console.log(destination)
  const selectedFilesArray = Array.from(selectedFiles.value)
  userStore.users[userIndex].allFiles.userFiles.forEach(file => {
    selectedFilesArray.forEach(selectedFile => {
      if (file.name === selectedFile.name && file.folder === selectedFile.folder) {
        file.folder = destination
      }
    })
  })
  closeDialogs("isMoveDialogOpen", "move-file")
}


const changeView = (view, name = '') => {
  viewState.value = view;
  switch (view) {
    case 'allFiles':
      headerText.value = 'My Files';
      closeFeatures()
      break;
    case 'folders':
      headerText.value = 'My Folders';
      closeFeatures()
      break;
    case 'folder':
      headerText.value = `Folder: ${name}`;
      selectedFolderName.value = name
      closeFeatures()
      break;
    default:
      headerText.value = '';
  }

}

const showDialogs = (dialogName, dialogId) => {
  switch (dialogName) {
    case 'isCreateDialogOpen' :
      changeView("folders")
      isCreateDialogOpen.value = true
      console.log(isCreateDialogOpen)
      break;
    case 'isDeleteDialogOpen':
      isDeleteDialogOpen.value = true
      break;
    case 'isCopyDialogOpen' :
      isCopyDialogOpen.value = true
      break;
    case 'isShareDialogOpen':
      isShareDialogOpen.value = true
      break;
    case 'isMoveDialogOpen':
      isMoveDialogOpen.value = true
      break;
    case 'isShareProcessDialogOpen':
      isShareProcessDialogOpen.value = true
      break;
  }
  document.getElementById(dialogId).showModal()
}
const closeDialogs = (dialogName, dialogId) => {
  switch (dialogName) {
    case 'isCreateDialogOpen' :
      isCreateDialogOpen.value = false;
      break;
    case 'isDeleteDialogOpen':
      isDeleteDialogOpen.value = false;
      break;
    case 'isShareDialogOpen' :
      isShareDialogOpen.value = false;
      desSelections.value = []
      break;
    case 'isMoveDialogOpen' :
      isMoveDialogOpen.value = false;
      break;
    case 'isCopyDialogOpen' :
      isCopyDialogOpen.value = false;
      break;
    case 'isShareProcessDialogOpen' :
      isShareProcessDialogOpen.value = false;
      break;
  }
  document.getElementById(dialogId).close()
}
const selectDesFolder = (folder) => {
  desFolder.value = folder
}


const handleUploadFile = (event) => {
  const files = event.target.files;
  const currentUser = userStore.currentUser;

  // Find the current user
  const user = userStore.users.find(user => user.username === currentUser.username);


  // Determine the folder based on the view state
  let folder;
  if (viewState.value === "allFiles") {
    folder = "/";
  } else if (viewState.value === "folder") {
    folder = `/${selectedFolderName.value}`;
  } else {
    console.error("Unexpected viewState value:", viewState.value);
    return;
  }

  Array.from(files).forEach(file => {
    const objectURL = window.URL.createObjectURL(new File([""], {type: "text/plain"}));
    if (file instanceof File) {
      const existingFile = user.allFiles.userFiles.find(f => f.name === file.name && f.folder === folder);
      if (!existingFile) {
        user.allFiles.userFiles.push({
          owner: user.username,
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          url: objectURL,
          size: file.size,
          folder: folder,
          path: folder,
          uploadTime: recordTime(),
          shareWith: []
        });
      }
    }
  })
  files.value = null
  console.log("Updated user files:", user.allFiles.userFiles);
}
const recordTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const createFolder = (createdFolderName) => {
  if (folderName.value !== "") {
    changeView('folders')
    closeDialogs('isCreateDialogOpen', 'create-folder')
    const user = userStore.users.find(user => user.username === userStore.currentUser.username)
    user.allFiles.folders.push(createdFolderName)
    console.log(user.allFiles.folders)
  } else {
    alert("Please set a name for your folder")
  }
  folderName.value = ''
}

const getAllFiles = computed(() => {
  const currentUser = userStore.currentUser.username;
  const user = userStore.users.find(user => user.username === currentUser);
  return (user?.allFiles?.userFiles || []).filter(file => file.folder === '/');
})
const hasFiles = computed(() => {
  const files = getAllFiles.value;
  return Array.isArray(files) && files.length > 0;
})

const getAllFolders = computed(() => {
  const currentUser = userStore.currentUser.username;
  const user = userStore.users.find(user => user.username === currentUser);
  return user?.allFiles?.folders || [];
});
const getAllFilesInFolder = computed(() => {
  const currentUser = userStore.currentUser.username;
  const user = userStore.users.find(user => user.username === currentUser);
  return (user?.allFiles?.userFiles || []).filter(file => file.folder === `/${selectedFolderName.value}`);
})

const getFileIcon = (fileName) => {
  // console.log(fileName)
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg' :
      return "/src/assets/jpg.svg"
    case 'pdf' :
      return "/src/assets/pdf.svg"
    default :
      return "/src/assets/unknown.svg"
  }
}
const getShortenedName = (filename) => {
  return filename.length <= 30 ? filename : `${filename.substring(0, 5)}...${filename.substring(filename.length - 5)}`
}
const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};
const toggleShowOptions = () => {
  showOptions.value = !showOptions.value
  console.log(selectedFiles.value)
}
const closeFeatures = () => {
  selectedFiles.value = []
  showOptions.value = false
}
const downloadFile = () => {
  for (let i = 1; i <= selectedFiles.value.length; i++) {
    const file = new File([""], {type: "text/plain"});
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `empty_file_${i}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
const deleteSelections = () => {
  const userIndex = userStore.users.findIndex(user => user.username === userStore.currentUser.username);
  console.log(selectedFiles.value)

  if (userIndex !== -1) {
    if (viewState.value === "allFiles") {
      userStore.users[userIndex].allFiles.userFiles = userStore.users[userIndex].allFiles.userFiles.filter(file =>
          // Filter out files with folder "/" and name in selectedFileNamesAndFolders
          !(file.folder === "/" && Array.from(selectedFiles.value).some(selected => selected.name === file.name))
      );
    } else if (viewState.value === "folder") {
      userStore.users[userIndex].allFiles.userFiles = userStore.users[userIndex].allFiles.userFiles.filter(file =>
          !(file.folder === `/${selectedFolderName.value}` && Array.from(selectedFiles.value).some(selectedFile => selectedFile.name === file.name)))
    } else if (viewState.value === "allFiles" && listView.value === true) {
      userStore.users[userIndex].allFiles.userFiles = userStore.users[userIndex].allFiles.userFiles.filter(file =>
          !(file.folder === `/${selectedFolderName.value}` && Array.from(selectedFiles.value).some(selectedFile => selectedFile.name === file.name)))
    }
  }
  closeDialogs('isDeleteDialogOpen', 'delete-file');
  selectedFiles.value = [];
}


</script>


<style scoped lang="scss">

* {
  font-family: Times, Times New Roman, serif;
}

.folder-content {
  margin-left: 20px;
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.file-item {
  margin-top: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

.first-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 275px;
  width: 1528px;
  overflow-y: hidden;
}


.features {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: fixed;
  top: 36.5%;
  left: 17%;
  background-color: white;
  width: 1000px;
  height: 55px;
  border-radius: 20px;
  box-shadow: 3px 7px 8px var(--dark);
  padding: 2px;
}


.features button {
  margin-top: 2px;
  margin-left: 4px;
  background: none;
  border: none;
  border-radius: 3px;
  color: #1e293b;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}

.features button i {
  margin-right: 5px; /* Space between icon and text */
}

.features button:hover {
  transform: scale(1.1);
  animation: beat 0.6s infinite;
  background-color: #64748b;
}

#cancel-selection {
  width: 125px;
  border-radius: 20px;
}

@keyframes beat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.second-container {
  overflow-y: scroll;
  position: fixed;
  top: 350px;
  left: 180px;
  height: 450px;
  width: 1520px;
}

.list-elements {
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1110px;
  height: 350px;
  overflow: hidden;
}

.root, .children-1 {
  position: relative;
  display: flex;
  text-align: left;
  width: 1080px;
  height: 40px;
  border: #dddddd 2px solid;
  background-color: transparent;
  border-radius: 10px;
  padding-left: 10px;
  margin-bottom: 5px;
  font-weight: bolder;
  font-size: 25px;
}

.children {
  overflow-y: scroll;
  padding-right: 30px;
}

.files-in-folder {
  position: relative;
}

.files {
  margin-top: 40px;
  margin-bottom: 20px;
}

.button {
  position: fixed;
  top: 4.5rem;
  left: 8rem;
  display: flex;
  gap: 20px;
}


#create-button, #upload-button, #display-button {
  width: 135px;
  height: 90px;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
}

#upload-button, #shared-button, #display-button {
  border-style: dashed;
  border-width: 1px;
  border-color: #dddddd;
  background-color: #213547;
}

#upload-button {
  color: white;
}

#create-button {
  background-color: #dddddd;
  color: #213547;
  margin-bottom: 5px;
}

#shared-button {
  width: 145px;
  height: 90px;
  font-size: 18px;
  font-weight: bolder;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  border-style: groove;
}

#view {
  position: fixed;
  top: 4.5rem;
  right: 4rem;
}


#cross-button {
  position: absolute;
  border-radius: 10px;
  outline: #1c2841;
  top: 0;
}

//the dialog
#create-folder {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  width: 500px;
  height: 250px;
  position: fixed;
  top: 40%;
  left: 34%;
  border-radius: 20px;
  background-color: var(--dialog-background);
  overflow-y: hidden;
}

//the input
.folder-name {
  position: relative;
  //left: 10px;
  margin: 40px 10px 30px 10px;
  width: 450px;
  height: 20%;
  font-size: 1.2em;
  padding: 20px 20px;
  line-height: 80px;
  border-radius: 10px;
  border: 2px solid #f0ffff;
  background: transparent;
}

input::placeholder {
  color: rgba(221, 221, 221, 0.7)
}

.create-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 0;
  margin-left: 260px;
  font-size: 18px;
  font-weight: bolder;
}

#cancelBtn {
  background-color: rgba(58, 74, 107, 0.8);;
}


#createBtn {
  background-color: #f1f1f1;
  color: #2c3e50;
}

#createBtn:hover {
  background-color: rgba(241, 241, 241, 0.6);
}

h1 {
  font-weight: bolder;
  position: fixed;
  left: 8%;
  top: 25%;

}

.separator {
  position: fixed;
  top: 34%;
  left: 8%;
  border-top: 3px solid #cccccc;
  margin: 10px 0 20px;
  width: 87%;
}

.folder-container {
  position: fixed;
  display: grid;
  gap: 35px;
  grid-template-columns: repeat(5, 1fr);
}

.file-container {
  height: 420px;
  width: 500px;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.fileInFolder-container {
  position: absolute;
  margin: 10px 0;
  display: grid;
  gap: 35px;
  grid-template-columns: repeat(5, 1fr);
}


.file-item, .folders-item, .folder-item {
  position: relative;
  top: 20%;
  //flex-direction: row;
  align-items: center;
  width: 200px;
  height: 270px;
  padding-top: 10px;
  padding-left: 10px;
  //border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  background-color: transparent;
}

.file-icon {
  position: relative;
  width: 175px;
  height: 175px;
}

.icon-container {
  position: absolute;

}

.file-checkbox {
  display: none;
}

.icon-container:hover .file-checkbox {
  position: absolute;
  left: 6px;
  top: 4px;
  display: block;
  width: 25px;
  height: 25px;
}

.url-container {
  position: absolute;
  top: 200px;
  flex-direction: column; /* Stack items vertically */
  align-items: flex-start;
  text-align: left;
  color: #cccccc;
}

.url-container a {
  text-decoration: none;
  color: #cccccc;
  font-weight: bolder;
  font-size: 20px;
  display: inline;
  margin-bottom: 2px;
}

.url-container a:hover {
  text-decoration: underline;
}

.nameContainer {
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}

.deleteDialog {
  position: fixed;
  top: 38%;
  left: 31%;
  width: 650px;
  height: 200px;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--dialog-background);
  display: flex;
  flex-direction: column;
  //gap: 1em; //when I add flex direction I can handle the spaces between them via gap
  //gap: 0.2em;
}

.deleteDialog h2 {
  margin-top: 20px;
  font-size: 1.7em;
  display: flex;
  align-items: center;

}

.deleteDialog h2 i {
  margin-right: 10px;
}

.deleteDialog p {
  margin: 0 0 0 20px;
  font-size: 1.2em;
  text-align: left;
}

.deleteBtn {
  border-radius: 40px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

#deleteBtn button {
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

#cancelBtn2 {
  border-radius: 10px;
  background-color: #ccc;
}

#deleteBtn {
  border-radius: 10px;
  background-color: #e53e3e;
  color: white;
}


.shareDialog {
  position: fixed;
  top: 25%;
  left: 35%;
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background-color: Rgba(255, 255, 255, 1.2);
  box-shadow: 6px 8px 5px var(--dark);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0,
  'wght' 600,
  'GRAD' 0,
  'opsz' 48
}

//copy dialog
.copyDialog, .moveDialog, .shareDialog {
  position: fixed;
  top: 8.5%;
  left: 21.5%;
  border-radius: 10px;
  width: 920px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.95); /* Adjusted opacity for better appearance */
  box-shadow: 6px 8px 5px var(--dark);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

input[type="checkbox"] {
  margin-right: 8px;
  width: 20px;
  height: 20px;
}

#cross-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  width: 10px;
  height: 10px;
}

.destinationList {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 40px;
  font-size: 20px;
}

table {
  width: 100%;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

td:last-child {
  border-bottom: none;
}

tr {
  cursor: pointer;
  transition: background-color 0.3s;
}

tr:hover {
  background-color: #f0f0f0;
}

tr.selected {
  background-color: #B0C4DE;
  font-weight: bolder;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.dialog-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.dialog-buttons button:first-of-type {
  background-color: #4CAF50;
  color: white;
}

.dialog-buttons button:last-of-type {
  background-color: #f44336;
  color: white;
}


.dialog-buttons {
  display: flex;
  justify-content: flex-end;
}

.shareProcessDialog {
  position: absolute;
  top: 8.5%;
  left: 21.5%;
  width: 920px;
  height: 600px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 6px 8px 5px var(--dark);
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
}

.tabs {
  position: relative;
  display: flex;
  width: 96%;
  align-items: center;
  border-bottom: 2px solid #ddd;
  background-color: transparent;
}

.tabs a {
  flex: 1;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #333;
  background: #f5f5f5;
  cursor: pointer;
  border: 1px solid transparent;
}

.tabs a.active {
  border-bottom: 4px solid blue;
  background: #fff;
  font-weight: bolder;
}

.tableContainer {
  position: relative;
  height: calc(100% - 40px);

  margin-top: 10px;
}

.shareByMeContent table {
  width: 100%;
  border-collapse: collapse;
  //overflow-y: auto;
}

.shareByMeContent th, .shareByMeContent td {
  border: 1px solid gray;
  padding: 8px;
  text-align: left;
}

.shareByMeContent th {
  background-color: #f2f2f2;
}


</style>