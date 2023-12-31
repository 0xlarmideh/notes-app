<template>
  <div>
    <TitleBar title="Your Notes" description="Here are your notes" />
    <div v-if="loading">Loading .......</div>
    <div class="mt-4 mb-8" v-else>
      <div class="flex justify-center">
        <RouterLink to="/create">
          <Button
            className="bg-blue-600 max-md:mt-[2.1rem]  mt-[.9rem]"
            text="Add note"
          />
        </RouterLink>
      </div>
      <div class="mb-4" v-if="notes" v-for="(note, idx) in notes">
        <p class="font-medium text-[30px]">{{ `${idx + 1}: ${note.title}` }}</p>
        <p class="text-[18px] font-[400]">{{ note.text }}</p>
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

onMounted(async () => {
  await fetchNotes();
});
</script>

<style scoped></style>
