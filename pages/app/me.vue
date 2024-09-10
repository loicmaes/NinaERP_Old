<script setup lang="ts">
import type { User } from "~/types/user";

await useStrictAccess(true);

const user = useState<User>("user");
</script>

<template>
  <div v-if="!user">
    <p>Vous n'êtes pas connecté !</p>
  </div>
  <div v-else>
    <h1>Bienvenue {{ user.userInfo?.firstName }} {{ user.userInfo?.lastName }}</h1>
    <p>{{ user.login }} · {{ user.email }}</p>
  </div>
</template>

<style scoped>

</style>
