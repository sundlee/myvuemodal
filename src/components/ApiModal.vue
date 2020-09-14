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
            <button @click="$emit('close')">취소</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	props: {
    position: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const btn = document.querySelector('.modal-window');
    console.log(btn);
    btn.style.left = `${this.position.x}px`;
    btn.style.top = `${this.position.y + 30}px`;
    console.log(this.position);
  },
}
</script>

<style lang="scss">
.modal {
  &.modal-overlay {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    position: absolute;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .modal-window {
    position: absolute;
    background-color: pink;
    background: #fff;
    border-radius: 4px;
    width: 450px;
    // left: 8px;
    // top: 105px;
    // height: 400px;
    word-wrap: break-word;
  }

  .modal-header {
    border-bottom: 1px solid lightgray;
    // background-color: lightcoral;
    padding: 20px;
    height: 10px;
  }

  .modal-content {
    // background-color: lightseagreen;
    position: relative;
    padding: 10px 20px;
    height: 200px;
    overflow-y: scroll;
  }

  .modal-footer {
    // background-color: lightsteelblue;
    border-top: 1px solid lightgray;
    position: relative;
    padding: 10px 20px;
    text-align: right;
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
