<template>
  <div>
    <div>
      <h4>Dialog</h4>
      <vc-button @click="show1 = true" type="info" size="medium">默认弹窗</vc-button>
      <vc-button @click="show2 = true" type="info" size="medium">多个弹窗</vc-button>
      <vc-button @click="show4 = true" type="info" size="medium">Iframe</vc-button>
      <vc-button @click="show5 = true" type="info" size="medium">自定义过渡动画</vc-button>
      <p></p>
      <vc-button @click="$alert('Alert 弹窗')" type="success" size="medium">Alert</vc-button>
      <vc-button @click="$confirm('Confirm 弹窗')" type="success" size="medium">Confirm</vc-button>
      <vc-button @click="handleAlert" type="success" size="medium">多个 Alert</vc-button>
      <vc-button @click="handleConfirm" type="success" size="medium">多个 Confirm</vc-button>
    </div>

    <m-dialog :show.sync="show1" title="默认弹窗">
      正文内容...
    </m-dialog>

    <m-dialog
      title="This is info message !"
      :show.sync="show2"
      auto-width
      >
      <span>This is content.</span>&nbsp;
      <vc-button @click="show3 = !show3" size="mini" type="info">第二个弹窗</vc-button>
    </m-dialog>

    <m-dialog
      title="预览"
      auto-width
      no-head
      :show.sync="show3"
      >
        <img src="https://avatars0.githubusercontent.com/u/11366654?s=460&v=4" alt=""/>
    </m-dialog>

    <m-dialog
      title="Iframe"
      :show.sync="show4"
      auto-width
      >
      <iframe src="https://www.lanyueos.com/" frameborder="0" style="width: 1000px;height: 600px;"></iframe>
    </m-dialog>

    <m-dialog
      title="自定义过渡动画"
      :show.sync="show5"
      width="350px"
      is-middle
      fade-name="test-fade"
      >
      <p>
        <strong>自定义弹窗动画</strong>
        <vc-button type="info" size="mini" @click="$alert('自定义动画', { fadeName: 'test-fade' })">Alert</vc-button>
      </p>
    </m-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false
    }
  },
  methods: {
    handleAlert () {
      for (let i = 0; i < 5; i++) {
        this.$alert(`Alert ${i}`)
      }
    },
    async handleConfirm () {
      for (let i = 0; i < 5; i++) {
        try {
          await this.$confirm(`Confirm ${i}`)
          // eslint-disable-next-line no-console
          console.log(`Confirm ${i}:`, true)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`Confirm ${i}:`, false)
        }
      }
    }
  }
}
</script>

<style>
/* 自定义弹窗动画 */
.test-fade-enter-active {
  transform-origin: center;
  animation: rotate-in .3s ease-in-out;
}
.test-fade-leave-active {
  transform-origin: center;
  animation: rotate-out .3s ease-in-out;
}

@keyframes rotate-in {
  0% {
    transform: rotate(-180deg) scale3d(.3,.3,.3);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg);
    opacity: 1;
  }
}

@keyframes rotate-out {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(180deg) scale3d(.3,.3,.3);
    opacity: 0;
  }
}
</style>
