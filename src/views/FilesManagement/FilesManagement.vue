<template>
  <div>
    <div class="first-container">
      <button
          style="position:absolute; left: 130px; top: 265px; width: 100px; height:30px;  background-color: #D3D3D3; justify-items:center ; color: blue"
          v-if="viewState=== 'folder' "
          @click="prev">prev
      </button>
      <div class="button">
        <button @click="showDialogs('isCreateDialogOpen' , 'create-folder')" id="create-button"><i
            class="fa-solid fa-folder-plus"></i><br>
          create folder
        </button>
        <input type="file" style="display: none" id="upload" multiple @change="handelUploadFile"
               :disabled="viewState === 'folders'">
        <button id="upload-button" onclick="document.getElementById('upload').click()"><i
            class="fa-solid fa-cloud-arrow-up"></i><br> upload file
        </button>
        <button @click="showDialogs('isShareProcessDialogOpen' , 'share-process')" id="shared-button"><i
            class="fa-solid fa-share-nodes"></i>shared/share
        </button>
        <div class="view">
          <button @click="toggleList"><img width="25" height="25"
                                           src="https://img.icons8.com/ios-filled/50/fcfcfc/list.png" alt="list"/>
          </button>
          <button @click="toggleGrid"><img width="25px" height="25px"
                                           src="https://img.icons8.com/ios-filled/50/fcfcfc/grid.png" alt="grid"/>
          </button>
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
          <button @click="closeFeatures" id="cancel-selection"><i class="fa-solid fa-xmark"></i> {{
              selectedFiles.length
            }}
            selected
          </button>
        </div>
      </div>
      <h1>{{ headerText }}</h1>
      <div class="separator">
        <div class="line"></div>
      </div>
    </div>
    <div class="second-container">
      <div v-if="hasFiles && viewState === 'allFiles' && gridView === true" class="file-container"
           id="myFilesContainer">
        <div v-for="doc in getAllFiles" :key="doc" class="file-item">
          <div class="icon-container">
            <div v-if="doc.type === 'file' ">
              <img alt="/" :src="getFileIcon(doc.name)" class="file-icon"/>
            </div>
            <div v-else>
              <img src="/src/assets/folder.svg" alt="/">
            </div>
            <input @change="toggleShowOptions" class="file-checkbox" type="checkbox" :value="doc"
                   v-model="selectedFiles"/>
          </div>
          <div class="url-container">
            <div v-if="doc.type === 'file'">
              <a :download="doc.name+'.txt'" href="#">{{ getShortenedName(doc.name) }}</a>
              <p>{{ formatFileSize(doc.size) }}</p>
            </div>
            <div v-else>
              <div style="cursor: pointer; " @click="changeView('folder' , doc.name)"> {{
                  getShortenedName(doc.name)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="viewState === 'allFiles' && gridView === true" class="placeholder-container">
        <p>No files to display. Upload or share files to see them here.</p>
      </div>


      <div v-else-if="listView === true && viewState === 'allFiles' ">
        <files-list
            :all-file-and-folders="all"
            :selected-files="selectedFiles"
            :expanded-files="expandedFiles"
            :changeView="changeView"
            @update:expanded="onFileExpanded"
            @update:selected="onFileSelected"
        >
        </files-list>
      </div>
      <div class="fileInFolder-container" v-if="viewState ===  'folder' && gridView === true">
        <div style="color: #dddddd" class="folder-item" v-for="doc in getAllFilesInFolder" :key="doc">
          <div class="icon-container">
            <div v-if="doc.type === 'file'">
              <img alt="/" :src="getFileIcon(doc.name)" class="file-icon"/>
              <input @change="toggleShowOptions" class="file-checkbox" type="checkbox"
                     :value="doc" v-model="selectedFiles"/>
              <div class="url-container">
                <a :download="doc.name+'.txt'" :href="doc.url" target="_blank">{{ getShortenedName(doc.name) }}</a>
                <p>{{ formatFileSize(doc.size) }}</p>
              </div>
            </div>
            <div v-else>
              <img src="/src/assets/folder.svg" alt="/">
              <input @change="toggleShowOptions" class="file-checkbox" type="checkbox"
                     :value="doc" v-model="selectedFiles"/>
              <div class="url-container">
                <div style="cursor: pointer; " @click="changeView('folder' , doc.name)"> {{
                    getShortenedName(doc.name)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="viewState === 'folder' && listView === true">
        <files-list
            :all-file-and-folders="getAllFilesInFolder"
            :selected-files="selectedFiles"
            :expanded-files="expandedFiles"
            :changeView="changeView"
            @update:expanded="onFileExpanded"
            @update:selected="onFileSelected"
        >
        </files-list>

      </div>
      <dialog id="create-folder" v-if="isCreateDialogOpen" @keydown.enter="createFolder(folderName)">
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

          <folder-tree
              :folders="foldersInTree" :selectedFolders="selectedFolders"
              :expandedFolders="expandedFolders"
              @update:selected="onFolderSelected"
              @update:expanded="onFolderExpanded">
          </folder-tree>


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
          <folder-tree
              :folders="foldersInTree" :selectedFolders="selectedFolders"
              :expandedFolders="expandedFolders"
              @update:selected="onFolderSelected"
              @update:expanded="onFolderExpanded">
          </folder-tree>
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
          <div v-if="currentTab ==='shareWithMe'">
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
                  <td>
                    <a
                        :download="file.name+'.txt'"
                        :href="file.url">{{ getShortenedName(file.name) }}</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="currentTab ==='shareByMe'">
            <div class="tableContainer">
              <table>
                <thead>
                <tr>
                  <th>File Name</th>
                  <th>Share with</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in currentShareByMe" :key="file" style="display: flex;">
                  <td>{{ file.name }}
                  </td>
                  <td>
                    <div v-for="f in file.shares" :key="f">
                      {{ f }} ,
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </dialog>
    </div>

  </div>

</template>


<script setup>
import FolderTree from "./FolderTree.vue";
import FilesList from "./FilesList.vue";
import {useUserStore} from "../../stores/userStore";
import {computed, ref} from "vue";
import {buildFolderTree} from "./FolderUtils.js"
import {buildTree} from "./FolderUtils.js"

const currentSharedWithMe = computed(() => {
  return userStore.users.find(u => u.username === userStore.currentUser.username).allFiles.sharedWithMe
})
const currentShareByMe = computed(() => {
  return userStore.users.find(u => u.username === userStore.currentUser.username).shareByMe

})
const prev = () => {
  console.log("check prev", currentFolder.value)
  const slashCount = (currentFolder.value.path.match(/\//g) || []).length;
  if (slashCount === 1) {
    console.log("here?")
    changeView("allFiles")
    currentFolder.value = toAccessUser.allFiles.folders.find(folder => folder.path === '/')
    console.log("check check", currentFolder.value)
  } else {
    console.log("there?")
    currentFolder.value = toAccessUser.allFiles.folders.find(folder => folder.path === currentFolder.value.path.substring(0, currentFolder.value.path.lastIndexOf('/')))
    changeView('folder', currentFolder.value.name)
  }
}

const toggleList = () => {
  gridView.value = false
  listView.value = true
}
const toggleGrid = () => {
  listView.value = false
  gridView.value = true
}

const userStore = useUserStore()
const isCreateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCopyDialogOpen = ref(false)
const isMoveDialogOpen = ref(false)
const isShareDialogOpen = ref(false)
const isShareProcessDialogOpen = ref(false)
const selectedFiles = ref([])
const expandedFiles = ref([])
const showOptions = ref(false)
const headerText = ref("My Files")
const viewState = ref("allFiles")
const listView = ref(false)
const gridView = ref(true)
const folderName = ref()
const selectedFolderName = ref()
const desSelections = ref([])
const currentTab = ref('shareWithMe')
const toAccessUser = userStore.users.find(user => user.username === userStore.currentUser.username)
const expandedFolders = ref()
const selectedFolders = ref()


const all = computed(() => {
  return buildTree(toAccessUser.allFiles.folders, toAccessUser.allFiles.userFiles)
})


const onFileSelected = (updatedSelectedFiles) => {
  console.log(updatedSelectedFiles)
  selectedFiles.value = Array.from(updatedSelectedFiles)


}
const onFileExpanded = (updatedExpandedFiles) => {
  expandedFiles.value = updatedExpandedFiles
}


const foldersInTree = computed(() => {
  console.log("before tree", toAccessUser.allFiles.folders)
  return buildFolderTree(toAccessUser.allFiles.folders)

})
const onFolderSelected = (updatedSelectedFolders) => {
  selectedFolders.value = updatedSelectedFolders;
  console.log('Selected Folders:', selectedFolders.value);
};

const onFolderExpanded = (updatedExpandedFolders) => {
  expandedFolders.value = updatedExpandedFolders;
  console.log('Expanded Folders:', expandedFolders.value);
};


const selectedFilesArray = computed(() =>
    Array.from(selectedFiles.value))


const anyFileSelected = computed(() => {
  return selectedFiles.value.length > 0;
})


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
          if (selected.name === file.name && selected.type === 'file') {
            desSelectionsArray.forEach(des => {
                  if (des.username) {
                    if (!file.shareWith.includes(des.username)) {
                      file.shareWith.push(
                          des.username
                      )
                      userStore.users.find(user => user.username === des.username).allFiles.sharedWithMe.push(selected)

                    }
                  } else if (des.groupName) {
                    console.log("group it is", des.groupName, des.users)
                    Array.from(des.users).forEach(u => {
                          if (!file.shareWith.includes(u)) {
                            file.shareWith.push(
                                u
                            )
                            userStore.users.find(user => user.username === u).allFiles.sharedWithMe.push(selected)
                          }
                        }
                    )
                  }
                  console.log(file.shareWith)
                }
            )
            userStore.users[userIndex].shareByMe.push({
              name: file.name,
              shares: file.shareWith
            })
          }
        })
      }
  )

  console.log(userStore.users)
  console.log("updated store:", userStore.users[userIndex].allFiles.userFiles)
  closeDialogs("isShareDialogOpen", "share-file")
  selectedFiles.value = []
  selectedFolders.value = []
  expandedFolders.value = []
}
const copyHere = () => {
  console.log("selections", selectedFolders.value)
  const filesArray = Array.from(selectedFiles.value);
  console.log("files array is", filesArray)
  filesArray.forEach(file => {
    if (file.type === "file") {
      selectedFolders.value.forEach(f => {
        toAccessUser.allFiles.userFiles.push({...file, folder: f, path: f})
        console.log("files afterr", toAccessUser.allFiles.userFiles)
      })
    }
  })
  closeDialogs('isCopyDialogOpen', 'copy-file')
  console.log("after copied")
  selectedFiles.value = []
  selectedFolders.value = []
  expandedFolders.value = []

}
const moveHere = () => {
  console.log("selections", selectedFolders.value)
  const filesArray = Array.from(selectedFiles.value);
  console.log("files array is", filesArray)
  filesArray.forEach(file => {
    if (file.type === "file") {
      selectedFolders.value.forEach(f => {
        toAccessUser.allFiles.userFiles.forEach(files => {
          if (files.name === file.name && files.path === file.path) {
            file.path = f
            files.folder = f
          }
        })

      })
    }
    console.log("after move", toAccessUser.allFiles.userFiles)
  })
  closeDialogs("isMoveDialogOpen", "move-file")
  console.log("move is closed ")
  selectedFiles.value = []
  selectedFolders.value = []
  expandedFolders.value = []
}


const currentFolder = ref({
  path: "/",
  name: "/"
})
const changeView = (view, name = '') => {
  console.log('changeView called with:', view, name); // Add this log
  viewState.value = view;
  switch (view) {
    case 'allFiles':
      headerText.value = 'My Files';
      currentFolder.value = {
        name: '/',
        path: '/'
      }
      closeFeatures()
      break;
    case 'folder':
      headerText.value = `Folder: ${name}`;
      selectedFolderName.value = name
      currentFolder.value = {
        name: name,
        path: userStore.users.find(user => user.username === userStore.currentUser.username).allFiles.folders.find(folder => folder.name === name).path
      }
      console.log("current after change:", currentFolder.value)
      closeFeatures()
      break;
    default:
      headerText.value = '';
  }
}

const showDialogs = (dialogName, dialogId) => {
  switch (dialogName) {
    case 'isCreateDialogOpen' :
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
  selectedFiles.value = [];
}


const handelUploadFile = (event) => {
  const files = event.target.files;
  const currentUser = userStore.currentUser;
  const user = userStore.users.find(user => user.username === currentUser.username);
  Array.from(files).forEach(file => {
    const objectURL = window.URL.createObjectURL(new File([""], {type: "text/plain"}));
    if (file instanceof File) {
      if (viewState.value === 'folder') {
        user.allFiles.userFiles.push({
          owner: user.username,
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          url: objectURL,
          size: file.size,
          folder: currentFolder.value.name,
          path: currentFolder.value.path,
          uploadTime: recordTime(),
          shareWith: [],
          type: "file"
        })
        console.log("upload in file", currentFolder.value.path)

      } else if (viewState.value === 'allFiles') {
        console.log("upload in all", currentFolder.value.path)
        user.allFiles.userFiles.push({
          owner: user.username,
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          url: objectURL,
          size: file.size,
          folder: "/",
          path: currentFolder.value.path,
          uploadTime: recordTime(),
          shareWith: [],
          type: "file"
        })
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
    closeDialogs('isCreateDialogOpen', 'create-folder')
    const user = userStore.users.find(user => user.username === userStore.currentUser.username)
    if (currentFolder.value.path === "/") {
      user.allFiles.folders.push(
          {
            owner: user.username,
            path: `${currentFolder.value.path}${createdFolderName}`,
            name: createdFolderName,
            type: "folder",
          })
      console.log("folder:", createdFolderName, user.folders)
    } else {
      user.allFiles.folders.push(
          {
            owner: user.username,
            path: `${currentFolder.value.path}/${createdFolderName}`,
            name: createdFolderName,
            type: "folder",
          })
    }
  } else {
    alert("Please set a name for your folder")
  }
  folderName.value = ''
}


//get all files in root
const getAllFiles = computed(() => {
  const currentUser = userStore.currentUser.username;
  const user = userStore.users.find(user => user.username === currentUser);
  const allDocs = []
  user.allFiles.userFiles.filter(file => {
    // If the path contains exactly two slashes, it's in the root directory
    if (file.path === "/") {
      allDocs.push(file);
    }
  })
  user.allFiles.folders.forEach(folder => {
    // Count the number of slashes in the path
    const slashCount = (folder.path.match(/\//g)).length;
    // if(folder.path.match(/\//g) && folder.path !== "/"){


    // If the path contains exactly two slashes, it's in the root directory
    if (slashCount === 1 && folder.path !== "/") {
      allDocs.push(folder);
    }
  });
  console.log(allDocs)
  return allDocs
})

const hasFiles = computed(() => {
  const files = getAllFiles.value;
  console.log(files)
  return Array.isArray(files) && files.length > 0;
})
const getAllFilesInFolder = computed(() => {
  const user = userStore.users.find(user => user.username === userStore.currentUser.username);
  const allFilesInFolder = []
  user.allFiles.folders.forEach(folder => {
    // Ensure the path starts with currentFolderPath and has exactly one more segment without a trailing slash
    const regex = new RegExp(`^${currentFolder.value.path}/[^/]+$`);
    if (regex.test(folder.path)) {
      allFilesInFolder.push(folder);
    }
  });
  user.allFiles.userFiles.find(file => {
    if (file.path === currentFolder.value.path) {
      allFilesInFolder.push(file)
    }
  })
  return allFilesInFolder
})

const getFileIcon = (fileName) => {
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
    Array.from(selectedFiles.value).forEach(selected => {
      if (selected.type === "file") {
        userStore.users[userIndex].allFiles.userFiles =
            userStore.users[userIndex].allFiles.userFiles.filter(file => file.name !== selected.name)
      } else if (selected.type === 'folder') {
        userStore.users[userIndex].allFiles.folders =
            userStore.users[userIndex].allFiles.folders.filter
            (folder => folder.name !== selected.name && !folder.path.includes(selected.name))
        userStore.users[userIndex].allFiles.userFiles = userStore.users[userIndex].allFiles.userFiles.filter(file => !file.path.includes(selected.name))
        console.log("folders after deletion", userStore.users[userIndex].allFiles.folders)
        console.log("folders after deletion", userStore.users[userIndex].allFiles.userFiles)
      }
    })
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
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 305px;
  width: 1528px;
  overflow-y: hidden;
}


.features {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  gap: 5px;
  background-color: white;
  width: 820px;
  height: 90px;
  border-radius: 10px;
  box-shadow: 3px 2px 9px var(--dark);
  padding: 1px;
}


.features button {
  margin: 6px;
  background: none;
  border: none;
  border-radius: 8px;
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
  background-color: rgb(209, 219, 235);
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
  display: flex;
  align-items: center;
  justify-items: center;
  overflow-y: scroll;
  position: fixed;
  top: 320px;
  left: 180px;
  height: 420px;
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
  position: absolute;
  top: 4.5rem;
  left: 8rem;
  display: flex;
  gap: 8px;
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

.view {
  display: flex;
  flex-direction: column;
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
  position: absolute;
  left: 8%;
  top: 60%;
}

.separator {
  position: absolute;
  top: 80%;
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
  top: 0;
  display: grid;
  height: 20px;
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
  left: 12px;
  top: 16px;
  display: block;
  width: 20px;
  height: 20px;
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
  font-weight: bold;
  font-size: 16px;
  display: flex;
  width: 190px;
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
  //flex-direction: column;
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