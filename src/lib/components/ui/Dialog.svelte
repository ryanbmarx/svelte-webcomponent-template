<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLDialogAttributes } from 'svelte/elements';

  type Props = {
    // Variables
    isOpen?: boolean;
    closeOnOutsideClick?: boolean;
    children?: Snippet;
    title?: string;
    description?: string;
    class?: string;

    // Events
    onopen?: EventListener;
    onclose?: EventListener;

    // Styles
    '--backdrop-color'?: string;
    '--transition-duration'?: string;
  } & HTMLDialogAttributes;

  // Variables
  let element: HTMLDialogElement;
  let {
    isOpen = $bindable(),
    closeOnOutsideClick = true,
    children,
    title,
    description,
    class: addClass = '',

    // Events
    onopen,
    onclose,

    ...restProps
  }: Props = $props();

  // Effect for isOpen state to open and close the dialog
  $effect(() => {
    if (!element) return;

    if (isOpen) {
      element.showModal();
      const event = new Event('open');
      if (onopen) onopen(event);
    } else {
      element.close();
    }
  });

  const closeHandler = (e: Event) => {
    isOpen = false;
    if (onclose) onclose(e);
  };

  const clickHandler = (event: MouseEvent) => {
    if (!closeOnOutsideClick) return;

    if (event.target === element) {
      isOpen = false;
    }
  };
  // Add event listeners
  $effect(() => {
    if (!element) return;

    element.addEventListener('close', closeHandler);
    element.addEventListener('click', clickHandler);

    return () => {
      element.removeEventListener('close', closeHandler);
      element.removeEventListener('click', clickHandler);
    };
  });
</script>

<dialog bind:this={element} {...restProps} class="min-w-[50%] shadow">
  <div class="bg-white p-8 m-auto w-full flex flex-col gap-4 relative{addClass}">
    <div>
      {#if title}
        <h1 class="text-lg font-bold">{title}</h1>
      {/if}
      {#if description}
        <p class="text-sm text-muted-foreground">{description}</p>
      {/if}
    </div>
    {#if children}
      {@render children()}
    {/if}
    <button
      class="text-muted-foreground absolute top-0 right-0 h-8 w-8 flex items-center justify-center"
      onclick={closeHandler}>&times;</button
    >
  </div>
</dialog>

<style>
  @property --transition-duration {
    syntax: '<time>';
    inherits: true;
    initial-value: 0.3s;
  }

  @property --backdrop-color {
    syntax: '<color>';
    inherits: true;
    initial-value: rgba(0, 0, 0, 0.2);
  }

  /* Rest default value */
  dialog {
    opacity: 0;
    border: unset;
    background: unset;
    padding: unset;

    position: absolute;
    inset: 50%;
    translate: -50% -50%;
    max-width: 75vw;
    max-height: 75vh;

    /* Animation */
    transition: all var(--transition-duration, 0.3s) allow-discrete;
  }

  dialog:focus {
    outline: none;
  }

  dialog[open] {
    opacity: 1;
  }

  @starting-style {
    dialog[open] {
      opacity: 0;
    }
  }

  dialog::backdrop {
    background-color: rgb(0 0 0 / 0%);
    transition: all var(--transition-duration, 0.3s) allow-discrete;
  }

  dialog[open]::backdrop {
    background-color: var(--backdrop-color, rgba(0, 0, 0, 0.2));
  }

  @starting-style {
    dialog[open]::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }
</style>
