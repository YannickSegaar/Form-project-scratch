<!-- Modal.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let visible: boolean;
  
    const dispatch = createEventDispatcher();
  
    function closeModal() {
      dispatch('close');
    }
  </script>
  
  {#if visible}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="close-button" on:click={closeModal}>&times;</button>
      <slot></slot> <!-- For embedding anything within the modal -->
    </div>
  </div>
  {/if}
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      position: relative;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  </style>
  