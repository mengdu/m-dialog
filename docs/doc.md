<div id="example"></div>
<script>
  export default {
    data () {
      return {
        show1: false
      }
    },
    methods: {
      handleAlert1 () {
        this.$alert('这是一个条提示消息', {
          typeIcon: 'info'
        })
      },
      handleAlert2 () {
        this.$alert('这是一个警告信息!', {
          title: '警告',
          typeIcon: 'warning',
          confirmButtonType: 'warning',
          confromButtonText: '确定'
        })
      },
      handleAlert3 () {
        for (let i = 0; i < 5; i++) {
          this.$alert(`这是第${i + 1}条提示消息`)
        }
      },
      handleConfirm1 () {
        this.$confirm('这是一条提示信息').then(() => {
          alert('确认了操作')
        }).catch(() => {
          alert('取消了操作')
        })
      },
      handleConfirm2 () {
        this.$confirm('你确定删除吗？', {
          typeIcon: 'danger',
          confirmButtonType: 'danger'
        }).then(() => {
          // alert('确认了操作')
        }).catch(() => {
          // alert('取消了操作')
        })
      },
      handleConfirm3 () {
        this.$confirm('你确定删除ID为：<strong>1001</strong> 的数据吗？', {
          typeIcon: 'danger',
          confirmButtonType: 'danger',
          supperHTMLString: true
        })
      }
    }
  }
</script>


## MDialog 弹框组件

创建一个简单的弹框的组件

:::demo 通过 `m-dialog` 组件，可以快速创建对话框，`show` 属性控制显示与关闭

```html
<m-dialog :show.sync="show1" title="对话框">
  <p>这是一段信息</p>
  <div slot="footer">
    <m-button @click="show1 = false">关闭</m-button>
  </div>
</m-dialog>
<m-button @click="show1 = true">开启弹窗</m-button>
<script>
  export default {
    data () {
      return {
        show1: false
      }
    }
  }
</script>
```

:::

## Alert 消息框

提示消息

:::demo 

```html
<m-button @click="handleAlert1" type="info">消息框</m-button>
<m-button @click="handleAlert2" type="warning">警告消息</m-button>
<m-button @click="handleAlert3" >并发多个消息</m-button>
<script>
  export default {
    methods: {
      handleAlert1 () {
        this.$alert('这是一个条提示消息', {
          typeIcon: 'info'
        })
      },
      handleAlert2 () {
        this.$alert('这是一个警告信息!', {
          title: '警告',
          typeIcon: 'warning',
          confirmButtonType: 'warning',
          confromButtonText: '确定'
        })
      },
      handleAlert3 () {
        for (let i = 0; i < 5; i++) {
          this.$alert(`这是第${i + 1}条提示消息`)
        }
      }
    }
  }
</script>
```

:::


## Confirm 对话框

对话框

:::demo 

```html
<m-button @click="handleConfirm1" type="info">对话框1</m-button>
<m-button @click="handleConfirm2" type="danger">对话框2</m-button>
<m-button @click="handleConfirm3" type="primary">对话框3</m-button>
<script>
  export default {
    methods: {
      handleConfirm1 () {
        this.$confirm('这是一条提示信息').then(() => {
          alert('确认了操作')
        }).catch(() => {
          alert('取消了操作')
        })
      },
      handleConfirm2 () {
        this.$confirm('你确定删除吗？', {
          typeIcon: 'danger',
          confirmButtonType: 'danger'
        }).then(() => {
          // alert('确认了操作')
        }).catch(() => {
          // alert('取消了操作')
        })
      },
      handleConfirm3 () {
        this.$confirm('你确定删除ID为：<strong>1001</strong> 的数据吗？', {
          typeIcon: 'danger',
          confirmButtonType: 'danger',
          supperHTMLString: true
        })
      }
    }
  }
</script>
```

:::
