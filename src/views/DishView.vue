<template>
  <n-row>
    <n-card>
        <div class="header">
            <n-space>
            <n-input v-model:value="value" type="text" placeholder="菜品名称" />
            <n-button type="primary" ghost>查询</n-button>
            </n-space>
            <div class="header-btn">
            <n-button type="primary" quaternary>
                    <template #icon>
                        <n-icon><add-icon /></n-icon>
                    </template>
                    添加菜品
            </n-button>
            </div>
        </div>
        <n-grid x-gap="24" y-gap="24" cols="2 1280:6 1000:4 600:3">
            <n-gi v-for="item in dishes" :key="item.dishName">
                <n-card content-style="padding: 0;" hoverable>
                    <img :src="item.dishImgUrl" class="dish-img">
                    <div class="dish-title">{{item.dishName}}</div>
                    <div class="dish-info">
                        <div class="dish-info-data">
                            <div style="margin-bottom: 4px">价格: {{item.dishPrice}}￥</div>
                            <div>库存: {{item.dishStock}}</div>
                        </div>
                        <div class="dish-info-category">{{item.dishCategory}}类</div>
                    </div>
                    <template #action>
                        <n-space justify="end">
                            <n-button type="primary" ghost @click="editDish(item)">编辑</n-button>
                            <n-button type="error" ghost>删除</n-button>
                        </n-space>
                    </template>
                </n-card>
            </n-gi>
        </n-grid>
        <n-pagination v-model:page="page" :page-count="100" class="page"/>
    </n-card>
  </n-row>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card style="width: 600px" title="菜品信息" closable @close="cancleEdit">
        <n-space vertical>
        <div>
            <a class="form-title">菜品图片</a>
            <n-space>
            <n-image width="96" height="96" :src="currentDish.dishImgUrl" object-fit="cover"></n-image>
            <n-upload
            action=""
            :default-file-list="fileList"
            list-type="image-card"
            >
            <n-icon><add/></n-icon>
            </n-upload>
            </n-space>
        </div>
        <div>
            <a class="form-title">菜品名称</a>
             <n-input v-model:value="currentDish.dishName" type="text" placeholder="基本的 Input" />
        </div>
        <div>
            <a class="form-title">菜品描述</a>
             <n-input v-model:value="value" type="textarea" placeholder="基本的 Input" />
        </div>
        <div>
            <a class="form-title">菜品种类</a>
            <n-select v-model:value="currentDish.dishCategory" :options="options" />
        </div>
        <div>
            <a class="form-title">菜品标签</a>
            <n-dynamic-tags v-model:value="tags" />
        </div>
        <n-space justify="space-between">
        <div>
            <a class="form-title">菜品原价</a>
            <n-input-number v-model:value="currentDish.dishPrice" clearable />
        </div>
        <div>
            <a class="form-title">菜品促销价</a>
            <n-input-number v-model:value="value" clearable />
        </div>
        </n-space>
        <div>
            <a class="form-title">推荐优先级</a>
            <n-input-number v-model:value="value" clearable />
        </div>
        <div>
            <div class="form-title">促销状态</div>
            <n-switch v-model:value="active"/>
        </div>
        <n-space style="margin-top: 20px;" justify="end">
            <n-button type="primary" ghost>确定</n-button>
            <n-button type="error" ghost @click="cancleEdit">取消</n-button>
        </n-space>
        </n-space>
    </n-card>
  </n-modal>
</template>

<script>
import { AddCircleOutline as AddIcon, Add } from '@vicons/ionicons5'
import { useDishEffect } from '../utils/dish'
import { ref } from 'vue'
export default {
  name: 'Dish',
  components: {
    AddIcon,
    Add
  },
  setup () {
    const { dishes } = useDishEffect()
    const showModal = ref(false)

    const currentDish = ref({
      dishName: '葱油拌面',
      dishImgUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      dishPrice: 10,
      dishStock: 15,
      dishCategory: '面食'
    })

    const editDish = (dish) => {
      showModal.value = true
      currentDish.value = dish
    }

    const cancleEdit = () => {
      showModal.value = false
    }

    return { dishes, showModal, editDish, currentDish, cancleEdit }
  }
}
</script>

<style lang="scss" scoped>

.header {
    display: flex;
    margin-bottom: 20px;
    &-btn{
        margin-left: auto;
    }
}

.dish{
    &-img{
        width: 100%;
        height: 235px;
    }
    &-title{
        text-align: left;
        font-size: 18px;
        font-weight: bold;
        padding: 8px 8px 4px 8px;
    }
    &-info{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 10px;
        font-weight: bold;
        &-data{
            padding-left: 10px;
            text-align: left;
        }
        &-category{
            padding-right: 10px;
            margin-left: auto;
        }
    }
}

.page{
    margin-top: 20px;
}

.form {
    &-title{
        width: 100%;
        display: inline-block;
        font-weight: bold;
        margin-bottom: 10px;
    }
}

</style>
