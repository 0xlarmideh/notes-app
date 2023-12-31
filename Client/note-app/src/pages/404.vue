<template>
  <div class="grid grid-cols-[1fr,1fr] gap-4 max-md:block error-page">
    <div class="img-container">
      <img src="../assets/404.svg" alt="404" class="img-404" />
    </div>
    <div class="link-container">
      <Button className="bg-slate-300 text-slate-500" text="Page not found" />

      <h1 className="text-[3.6rem] text-left max-md:text-[8vw] py-[2rem]">
        Oh no! Error 404
      </h1>
      <p className="w-[80%] text-left max-md:w-full text-[1.4rem]">
        Something happened along your way here. Maybe try another time
      </p>
      <RouterLink to="/">
        <Button
          className="bg-black max-md:mt-[2.1rem]  mt-[.9rem]"
          text="Go Home"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../components/Button.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    Button,
  },
});
</script>

<style scoped></style>
