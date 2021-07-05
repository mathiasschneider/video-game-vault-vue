<template>
  <div class="lists-edit">
    <div>
      Title:
      <input type="text" v-model="editListParams.title" placeholder="Title" />
      <br />
      Public?
      <br />
      <div>
        <label for="true">
          True
          <input value="true" type="radio" id="publicRadio" name="public" v-model="editListParams.public" />
        </label>
        <br />

        <label for="false">
          False
          <input value="false" type="radio" id="publicRadio" name="public" v-model="editListParams.public" />
        </label>
        <br />
      </div>

      <button class="more-info" v-on:click="editList()">Save</button>
    </div>
  </div>
</template>

<style>
.more-info {
  margin-bottom: 35px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      lists: [],
      editListParams: {},
    };
  },
  created: function () {
    this.showList();
  },
  methods: {
    showList: function () {
      axios
        .get(`/lists/${this.$route.params.id}`)
        .then((response) => {
          console.log("list show:", response.data);
          return (this.editListParams = response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    editList: function () {
      axios
        .patch(`lists/${this.editListParams.id}`, this.editListParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/lists/${response.data.id}`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>
