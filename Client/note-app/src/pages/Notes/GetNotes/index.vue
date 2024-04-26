<template>
  <div>
    <TitleBar title="Your Notes" description="Here are your notes" />
    <div v-if="loading">Loading .......</div>
    <div class="mt-4 mb-8" v-else>
      <div class="flex justify-center">
        <RouterLink to="/create">
          <Button class="bg-blue-600 max-md:mt-[2.1rem]  mt-[.9rem]" text="Add note" />
        </RouterLink>
      </div>
      <div class="mb-4" v-if="notes" v-for="(note, idx) in notes">
        <div class="border-b pb-4 flex items-center justify-between">
          <RouterLink :to="'/notes/' + note._id">
            <p class="font-medium text-[30px]">
              {{ `${idx + 1}: ${note.title}` }}
            </p>
            <p class="text-[18px] font-[400]">{{ note.text }}</p>
          </RouterLink>
          <span class="cursor-pointer" @click="deleteNote(note._id)">
            <Icon icon="fluent:delete-20-filled" color="red" height="32" />
          </span>
        </div>
      </div>
      <div v-else>No notes found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TitleBar from "../../../components/TitleBar.vue";
import axios from "axios";
import Button from "../../../components/Button.vue";
import { Icon } from "@iconify/vue";

const loading = ref(false);
const notes = ref();
const fetchNotes = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/api/notes");
    notes.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const deleteNote = async (id: string) => {
  await axios
    .delete("/api/notes/" + id)
    .then(() => {
      fetchNotes();
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to delete note");
    });
};

onMounted(async () => {
  await fetchNotes();
});
</script>

<style scoped></style>
