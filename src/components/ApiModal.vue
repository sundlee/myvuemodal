<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <header class="modal-header">
          <slot name="header">
            <button @click="$emit('close')">Close</button>
          </slot>
        </header>
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    width: 450px;
    height: 400px;
    word-wrap: break-word;
    hyphens: auto;
  }

  &-header {
    // margin-bottom: 30px;
    padding: 20px 20px;
    height: 10px;
  }

  &-content {
    position: relative;
    padding: 10px 20px;
    height: 300px;
    overflow-y: scroll;
  }

  &-footer {
    // background-color: royalblue;
    position: relative;
    height: 50px;
    // background: #ccc;
    padding: 10px;
    margin: 10px;
    // text-align: left;
    bottom: 10px;
    // right: 50px;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
