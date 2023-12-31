import { createRouter, createWebHashHistory } from "vue-router";

const Notes = () => import("../pages/Notes/GetNotes/index.vue");
const NoteDetail = () => import("../pages/Notes/NoteDetail/index.vue");
const CreateNote = () => import("../pages/Notes/Create/index.vue");
const EditNote = () => import("../pages/Notes/Edit/index.vue");
const NotFound = () => import("../pages/404.vue")

const routes = [
  { path: "/", component: Notes },
  { path: "/note/:id", component: NoteDetail },
  { path: "/create", component: CreateNote },
  { path: "/edit/:id", component: EditNote },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];


const router = createRouter({
  history: createWebHashHistory("/"),
  routes, 
});

export default router
