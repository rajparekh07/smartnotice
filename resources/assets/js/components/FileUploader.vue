<template>

  <div>
    <input type="file" multiple accept="application/pdf" @change="detectFiles($event.target.files)">

    <v-progress-linear v-model="progressUpload"></v-progress-linear>

  </div>

</template>

<script>
// import storage from 'firebase/storage'
export default {
  data () {
    return {
      progressUpload: 0,
      file: File,
      uploadTask: '',
    }
  },
  methods: {
    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).map( x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.uploadTask = window.app.storage().ref(""+new Date().getTime()).put(file);
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      }, 
      null, 
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.$emit('url', downloadURL)
        })
      })
    }
  }
}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
</style>