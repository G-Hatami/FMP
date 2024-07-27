<template>

  <div>
    <div class="first-container">
      <div v-if="anyFileSelected" class="features">
        <button @click="showDeleteDialog" style="color: #1e293b "><i class="fa-solid fa-trash"></i>Delete</button>
        <button @click="showShareDialog" style="color: #1e293b "><i class="fa-solid fa-share-from-square"></i>Share
        </button>
        <button @click="showCopyDialog" style="color: #1e293b "><i class="fa-solid fa-copy"></i>Copy</button>
        <button @click="deleteFile" style="color: #1e293b "><i class="fa-solid fa-download"></i>Download</button>
        <button @click="showMoveDialog" style="color: #1e293b "><i class="fa-solid fa-arrow-right"></i>Move
        </button>
        <button @click="closeFeatures" id="cancel-selection"><i class="fa-solid fa-xmark"></i> {{ selectedFiles.size }}
          selected
        </button>
      </div>
      <div class="button">
        <button @click="showCreateFolderDialog" id="create-button"><i class="fa-solid fa-folder-plus"></i><br>
          create folder
        </button>
        <input type="file" style="display: none" id="upload" multiple @change="handleUploadFile">
        <button id="upload-button" onclick="document.getElementById('upload').click()"><i
            class="fa-solid fa-cloud-arrow-up"></i><br> upload file
        </button>

        <button @click="test" id="shared-button"><i class="fa-solid fa-share-nodes"></i><br>
          test
        </button>

      </div>

      <h1  style="color: #f1f1f1">{{ headerText }}</h1>
      <div class="separator"></div>
    </div>

    <div class="second-container">
      <div class="file-container" id="myFilesContainer" v-show="hasUploadedFiles && displayAllFiles">
        <div v-for="file in currentUserFiles" :key="file.name" class="file-item">
          <div class="icon-container">
            <img alt="/" :src="getFileIcon(file.name)" class="file-icon"/>
            <input @change="toggleShowOptions" class="file-checkbox" type="checkbox"
                   v-model="selectedFiles" :value="file.name"/>
          </div>
          <div class="url-container">
            <a :href="file.url" target="_blank">{{ getShortenedName(file.name) }}</a>
            <p>{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="second-container">-->
    <!--      <div class="folder-container" id="createdFoldersContainer" v-if="hasCreatedFolders">-->
    <!--        <div v-for="folder in currentUserFolders" :key="folder.name">-->
    <!--          <div class="icon-container">-->
    <!--            &lt;!&ndash; there would be only one image  />&ndash;&gt;-->
    <!--            &lt;!&ndash;            <img alt="/" :src="getFileIcon(file.name)" class="file-icon"/>&ndash;&gt;-->
    <!--            <input @change="toggleShowOptions" class="file-checkbox" type="checkbox"-->
    <!--                   v-model="selectedFiles" :value="folder.name"/>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
  <dialog id="create-folder" v-if="isCreateDialogOpen">
    <h2><i class="fa-solid fa-folder"></i> Create new folder</h2>
    <input placeholder="Enter folder name" class="folder-name" type="text" required>
    <button id="cross-button"><i class="fa-solid fa-xmark" @click="closeCreateFolderDialog"></i></button>
    <div class="create-buttons">
      <button id="cancelBtn" @click="closeCreateFolderDialog">cancel</button>
      <button id="createBtn" @click="createFolder">create</button>
    </div>
  </dialog>
  <dialog id="delete-file" class="deleteDialog" v-if="isDeleteDialogOpen">
    <button @click="closeDeleteDialog" id="cross-button"><i class="fa-solid fa-xmark"></i></button>
    <h2><i class="fa-solid fa-circle-exclamation" style="color: #64748b;"></i>Delete two items?</h2><br>
    <p>Are You sure you want to delete files ? if you remove this file it will be send to recycle bin ?</p>
    <div class="deleteBtn">
      <button id="cancelBtn2" @click="closeDeleteDialog">Cancel</button>
      <button id="deleteBtn" @click="deleteSelections">Delete</button>
    </div>
  </dialog>

  <dialog id="copy-file" class="moveDialog" v-if="isCopyDialogOpen">
    <button @click="closeCopyDialog" id="cross-button"><i class="fa-solid fa-xmark" style="color: #1e293b"></i></button>
    <div class="folder-container">
    </div>
    <button></button>
    <button></button>
  </dialog>

  <dialog id="move-file" class="copyDialog" v-if="isMoveDialogOpen">
    <button @click="closeMoveDialog" id="cross-button"><i class="fa-solid fa-xmark" style="color: #1e293b"></i></button>
    <div class="folder-container">
    </div>
    <button></button>
    <button></button>

  </dialog>
  <dialog id="share-file" class="shareDialog" v-if="isShareDialogOpen">
    <button @click="closeShareDialog" id="cross-button"><i class="fa-solid fa-xmark" style="color: #1e293b"></i>
    </button>
    <div class="folder-container">
    </div>
    <button></button>
    <button></button>

  </dialog>

</template>


<script setup>
// import '@material-icons/font/css/material-icons.css';
import {useUserStore} from "../../stores/userStore";
import {computed, ref} from "vue";


const userStore = useUserStore()
const isCreateDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isCopyDialogOpen = ref(false)
const isMoveDialogOpen = ref(false)
const isShareDialogOpen = ref(false)
const selectedFiles = ref(new Set());//remember this only contains namessssss
const showOptions = ref(false)
const displayAllFiles = ref(true)
// const displayFolders = ref(false)
const headerText = ref("My Files")
const anyFileSelected = computed(() => {
  return selectedFiles.value.size > 0;
})


const test = () => {
  displayAllFiles.value = true
}

const showCreateFolderDialog = () => {
  isCreateDialogOpen.value = true
  document.getElementById("create-folder").showModal()
}
const closeCreateFolderDialog = () => {
  isCreateDialogOpen.value = false
  document.getElementById("create-folder").close()
  // console.log(typeof BigInt === 'function');
}
const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  document.getElementById("delete-file").close()
}
const showDeleteDialog = () => {
  isDeleteDialogOpen.value = true
  document.getElementById("delete-file").showModal()
}
const showCopyDialog = () => {
  isCopyDialogOpen.value = true
  document.getElementById("copy-file").showModal()
}
const closeCopyDialog = () => {
  isCopyDialogOpen.value = false
  document.getElementById("copy-file").close()
}
const showMoveDialog = () => {
  isMoveDialogOpen.value = true
  document.getElementById("move-file").showModal()
}
const closeMoveDialog = () => {
  isMoveDialogOpen.value = false
  document.getElementById("move-file").close()
}
const showShareDialog = () => {
  isShareDialogOpen.value = true
  document.getElementById("share-file").showModal()
}
const closeShareDialog = () => {
  isShareDialogOpen.value = false
  document.getElementById("share-file").close()
}
const deleteSelections = () => {
  const currentUser = userStore.currentUser.username;
  const userUploads = userStore.allUploaded.find(user => user.username === currentUser);
  console.log("user is here", userUploads)
  const selectedArray = Array.from(selectedFiles.value);
  console.log('selectedFilesArray:', selectedArray);
  userUploads.upload = userUploads.upload.filter(file => !selectedArray.includes(file.name));
  selectedFiles.value.clear()
  closeDeleteDialog()
};


const handleUploadFile = (event) => {
  const files = event.target.files;
  const user = userStore.currentUser.username
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (userStore.allUploaded.length === 0) {
      userStore.allUploaded.push({
        username: user,
        upload: [{
          type: "file",
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size
        }]
      })

      console.log("this is when length is 0", userStore.allUploaded)
    }
    //when people have uploaded files
    else {
      const index = userStore.allUploaded.find(u => u.username === user)
      //if current user uploaded
      if (index !== undefined) {
        index.upload.push({
          type: "file",
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size
        })

        const indexNum = userStore.allUploaded.findIndex(u => u.username === index.username)

        userStore.allUploaded[indexNum] = index

        console.log("this is when we found user", userStore.allUploaded)

      } else {
        userStore.allUploaded.push({
          username: user,
          upload: [{
            type: "file",
            name: file.name,
            url: URL.createObjectURL(file),
            size: file.size
          }]
        })
        console.log("this is when index is undefined", userStore.allUploaded)
      }

    }
  }

}
const currentUserFiles = computed(() => {
  const currentUser = userStore.currentUser.username;
  const userUploads = userStore.allUploaded.find(user => user.username === currentUser);
  return userUploads ? userUploads.upload : [];
});
const hasUploadedFiles = computed(() => {
  const currentUser = userStore.currentUser.username;
  const userUploads = userStore.allUploaded.find(user => user.username === currentUser);
  return userUploads && userUploads.upload.length > 0;
});
const createFolder = () => {
  // displayAllFiles.value = false
  // displayFolders.value = true
  // closeCreateFolderDialog()
  // headerText.value = "Folders"

}


const getFileIcon = (fileName) => {
  console.log(fileName)
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
  selectedFiles.value.clear()
  showOptions.value = false
}
const deleteFile = () => {
  for (let i = 1; i <= selectedFiles.value.size; i++) {
    const blob = new Blob([""], {type: "text/plain"});
    const url = window.URL.createObjectURL(blob);
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

</script>


<style scoped lang="scss">

* {
  font-family: Times, Times New Roman, serif;
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
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  top: 30%;
  left: 47%;
  background-color: white;
  width: 755px;
  height: 50px;
  border-radius: 10px;
  box-shadow: 1px 9px 5px var(--dark);
}

.features button {
  margin-top: 5px;
  margin-left: 7px;
  background: none;
  border: none;
  border-radius: 2px;
  color: #1e293b;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}

.features button i {
  margin-right: 8px; /* Space between icon and text */
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
  top: 278px;
  left: 180px;
  height: 467.4px;
  width: 1528px;
}

.button {
  position: fixed;
  top: 4.5rem;
  left: 8rem;
  display: flex;
  gap: 20px;
}


#create-button, #upload-button {
  width: 170px;
  height: 70px;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
}

#upload-button, #shared-button {
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
  width: 170px;
  height: 70px;
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  border-style: groove;
}

h2 {
  margin-top: 15px;
  margin-left: 20px;
}

#cross-button {
  position: absolute;
  border-radius: 10px;
  outline: #1c2841;
  top: 0;
  right: 0;
}

//the dialog
#create-folder {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  left: 10px;
  top: 8%;
  width: 450px;
  height: 20%;
  font-size: 1.2em;
  padding: 20px 20px;
  margin: 0 10px;
  line-height: 80px;
  border-radius: 10px;
  border: 2px solid #f0ffff;
  background: transparent;
  //z-index: 1111;

}

input::placeholder {
  color: rgba(221, 221, 221, 0.7)
}

.create-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 35px;
  margin-left: 260px;
  font-size: 18px;
  font-weight: bolder;
}

#cancelBtn {
  background-color: rgba(58, 74, 107, 0.8);;
}

#cancelBtn:hover {

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

.file-container {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
}

.file-item {
  position: relative;
  top: 20%;
  flex-direction: row;
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

.icon-container:hover {

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

.copyDialog, .moveDialog {
  position: fixed;
  top: 8.5%;
  left: 21.5%;
  border-radius: 10px;
  width: 920px;
  height: 600px;
  background-color: Rgba(255, 255, 255, 1.2);
  box-shadow: 6px 8px 5px var(--dark);
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
</style>