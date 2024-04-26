<template>
  <div>
    <TitleBar title="Edit Notes" description="Here you can edit your note" />
    <div class="mt-4 ">
      <div class="flex mb-8 justify-center">
        <RouterLink to="/">
          <Button class="bg-blue-600 max-md:mt-[2.1rem]  mt-[.9rem]" text="Back to notes" />
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
        <Button :disabled="!title" class="bg-black flex justify-center" @click="editNote"
          :text="editingNote ? 'Editing note' : 'Edit Note'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import TitleBar from "../../../components/TitleBar.vue";
import Button from "../../../components/Button.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const title = defineModel("title");
const text = defineModel("text");
const editingNote = ref(false);
const route = useRoute();
const router = useRouter();
const loading = ref(false);

const fetchNote = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/api/notes/" + route.params.id);
    title.value = response.data.title;
    text.value = response.data.text;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchNote();
});

const editNote = async () => {
  editingNote.value = true;
  const formBody = text.value
    ? { title: title.value, text: text.value }
    : { title: title.value };
  await axios
    .patch("/api/notes/" + route.params.id, formBody)
    .then(() => {
      alert("Note edited");
      title.value = "";
      text.value = "";
      editingNote.value = false;
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to edit note");
    });
};
</script>

<style scoped></style>
