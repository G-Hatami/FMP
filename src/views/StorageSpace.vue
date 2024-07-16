<script setup>

</script>

<template>
  <div class="container">
    <h2>Uploaded Files Information</h2><br>
    <div class="table-container">

      <table>
        <thead>
        <tr>
          <th>Owner</th>
          <th>File Path</th>
          <th>Size</th>
          <th>Upload Time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>JohnDoe</td>
          <td>/uploads/file1.txt</td>
          <td>24 KB</td>
          <td>2024-07-06 10:30:00</td>
        </tr>
        <tr>
          <td>JaneSmith</td>
          <td>/uploads/image.jpg</td>
          <td>356 KB</td>
          <td>2024-07-05 15:45:23</td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">

.container {
  position: fixed;
  top: 30px;
  right: 350px;
  //display: flex;
  //flex-direction: column;
}

h2 {
  position: fixed;
  top: 10rem;
  left: 0rem;
  color: #213547;
}

.table-container {
  width: 1000px;
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  //justify-content: center;
  //align-items: center;
  //margin-bottom: 2rem;
  //margin-top: 2rem;
  //position: fixed;
  //top: 2.5rem;
  //right: 15rem;
  //display: flex;
  //justify-content: center;
  margin-left: 5%;


}


table {
  position: relative;
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: black;
  border-bottom: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: var(--dark)
}

tbody tr:nth-child(odd) {
  background-color: hsl(var(--hue), var(--saturation), calc(45% + var(--darkness)));
}


td, th {
  height: 2.5rem;
  width: auto;
  padding: 8px;
  border: 1px solid #ddd;
}

tr {
  height: 50px;
}

</style>