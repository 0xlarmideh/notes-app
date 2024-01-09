<template>
  <div>
    <TitleBar
      title="Note detail"
      description="Here, you find details of your note"
    />
    <div v-if="loading">Loading .......</div>
    <div class="mt-4 mb-8" v-else>
      <div class="flex justify-center">
        <RouterLink to="/">
          <Button
            class="bg-blue-600 max-md:mt-[2.1rem]  mt-[.9rem]"
            text="Back to notes"
          />
        </RouterLink>
      </div>
      <div class="mb-4 flex items-center justify-between" v-if="note">
        <div class="hover:cursor">
          <p class="font-medium text-[30px]">
            {{ note.title }}
          </p>
          <p class="text-[18px] font-[400]">{{ note.text }}</p>
        </div>
        <span
          >
          <RouterLink :to="'/edit/' + note._id">
            <Icon icon="mingcute:edit-fill" color="gray" height="32" />
          </RouterLink>
        </span>
      </div>
      <div v-else>No note found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TitleBar from "../../../components/TitleBar.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import Button from "../../../components/Button.vue";
import { useRoute } from "vue-router";

const loading = ref(false);
const note = ref();
const route = useRoute();
const fetchNotes = async () => {
  loading.value = true;
  try {
    const response = await axios.get("/api/notes/" + route.params.id);
    note.value = response.data;
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
