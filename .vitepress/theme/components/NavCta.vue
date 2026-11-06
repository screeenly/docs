<script setup lang="ts">
defineProps<{ stacked?: boolean }>();
</script>

<template>
    <div class="nav-cta" :class="{ stacked }">
        <a class="nav-cta-signin" href="https://3.screeenly.com/app/login">Sign in</a>
        <a class="nav-cta-start" href="https://3.screeenly.com/app/register">Start for free</a>
    </div>
</template>

<style scoped>
.nav-cta {
    display: none;
    align-items: center;
    gap: 0.625rem;
    margin-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.nav-cta.stacked {
    display: flex;
    margin: 1.5rem 0 0;
    padding-top: 1rem;
    border-top: 1px solid var(--color-line-soft);
}

/* VitePress moves the nav links into the mobile menu below 768px. */
@media (min-width: 768px) {
    .nav-cta {
        display: flex;
    }

    .nav-cta.stacked {
        display: none;
    }
}

.nav-cta-signin {
    padding: 0.5rem 0.75rem;
    color: var(--color-ink-soft);
    transition: color 0.15s;
}

.nav-cta-signin:hover {
    color: var(--color-ink);
}

.stacked .nav-cta-signin {
    border: 1px solid var(--color-line);
    border-radius: 0.5rem;
    padding: 0.375rem 0.625rem;
    color: var(--color-ink);
    font-weight: 500;
}

.nav-cta-start {
    border-radius: 0.5rem;
    padding: 0.375rem 0.625rem;
    background-color: var(--color-ink);
    color: #fff;
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 0.15s;
}

.nav-cta-start:hover {
    background-color: var(--color-zinc-700);
}
</style>
