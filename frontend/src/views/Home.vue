<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-8">
          <img src="https://via.placeholder.com/150" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg">
        </div>
        <h1 class="text-5xl font-bold text-gray-800 mb-4">全栈开发工程师</h1>
        <p class="text-xl text-gray-600 mb-8">熟练掌握 Vue.js | Node.js | MongoDB | Unity 3D</p>
        <div class="flex gap-4 justify-center">
          <a href="#projects" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">查看作品</a>
          <a href="#contact" class="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition">联系我</a>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">技能专长</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="skill in skills" :key="skill._id" class="skill-card bg-gray-50 p-6 rounded-lg hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-3">{{ skill.name }}</h3>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div class="bg-blue-600 h-3 rounded-full transition-all" :style="{ width: skill.proficiency + '%' }"></div>
            </div>
            <p class="text-sm text-gray-600">{{ skill.proficiency }}% 熟练度</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">项目作品</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project._id" class="project-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
            <img :src="project.coverImage" :alt="project.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.techStack" :key="tech" class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-2xl">
        <h2 class="text-4xl font-bold text-center mb-12">联系我</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">姓名</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">邮箱</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">留言</label>
            <textarea v-model="form.content" required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {{ loading ? '发送中...' : '发送留言' }}
          </button>
          <p v-if="message" :class="['text-center', messageType === 'success' ? 'text-green-600' : 'text-red-600']">
            {{ message }}
          </p>
        </form>

        <div class="mt-12 text-center">
          <p class="text-gray-600 mb-4">或通过以下方式联系我：</p>
          <div class="flex justify-center gap-4">
            <a href="https://github.com/SlienceLove" target="_blank" class="text-blue-600 hover:text-blue-800">GitHub</a>
            <a href="mailto:your-email@example.com" class="text-blue-600 hover:text-blue-800">Email</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProjects, getSkills, sendMessage } from '../api';

const projects = ref([]);
const skills = ref([]);
const loading = ref(false);
const message = ref('');
const messageType = ref('');

const form = ref({
  name: '',
  email: '',
  content: '',
});

const fetchData = async () => {
  try {
    const [projectsRes, skillsRes] = await Promise.all([
      getProjects(),
      getSkills(),
    ]);

    projects.value = projectsRes.data.data;
    skills.value = skillsRes.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleSubmit = async () => {
  loading.value = true;
  message.value = '';

  try {
    await sendMessage(form.value);
    message.value = '留言发送成功！';
    messageType.value = 'success';
    form.value = { name: '', email: '', content: '' };
  } catch (error) {
    message.value = '发送失败，请稍后重试';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.project-card {
  transform: translateY(0);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.skill-card {
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: scale(1.05);
}
</style>
