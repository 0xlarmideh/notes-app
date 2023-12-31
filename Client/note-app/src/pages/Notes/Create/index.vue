<template>
  <div>
    <TitleBar
      title="Create Notes"
      description="Provide details to create your note"
    />
    <div class="mt-4 ">
      <div class="flex mb-8 justify-center">
        <RouterLink to="/">
          <Button
            className="bg-blue-600 max-md:mt-[2.1rem]  mt-[.9rem]"
            text="Back to notes"
          />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-4 max-w-[400px] mx-auto">
        <div class="flex flex-col">
          <label class="text-[18px]" for="title">Title</label>
          <input required class="border p-2" type="text" v-model="title" />
        </div>
        <div class="flex flex-col">
          <label class="text-[18px]" for="description">Description</label>
          <input class="border p-2" type="text" v-model="text" />
        </div>
        <Button
          :disabled="!title"
          class="bg-black flex justify-center"
          @click="createNote"
          :text="creatingNote ? 'Creating note' : 'Create Note'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import TitleBar from "../../../components/TitleBar.vue";
import Button from "../../../components/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const title = defineModel("title");
const text = defineModel("text");
const creatingNote = ref(false);
const router = useRouter();

const createNote = async () => {
  creatingNote.value = true;
  const formBody = text.value
    ? { title: title.value, text: text.value }
    : { title: title.value };
  await axios
    .post("/api/notes", formBody)
    .then(() => {
      alert("Note created");
      title.value = "";
      text.value = "";
      creatingNote.value = false;
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to create note");
    });
};
</script>

<style scoped></style>
