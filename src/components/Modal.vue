<template>
  <div class="example-modal-window">
    <p>버튼을 클릭하면 모달이 열립니다.</p>
    <button @click="openModal">열기</button>

    <ApiModal @close="closeModal" v-if="modal">
      <!-- <div class="text-uppercase text-bold">id selected: {{selected}}</div> -->
      <template slot="header">
        <div class="dialogTitle">API 선택 ({{selected}})</div>
      </template>
      <ul class="apiList">
        <li class="apiItem">
          <input class="apiItemPart" type="checkbox" v-model="selectAll" @click="select" />
          <div class="apiItemPart">All</div>
        </li>
        <li class="apiItem" v-for="a in apis" :key="a.apiId">
          <input class="apiItemPart" :value="a.apiId" type="checkbox" v-model="selected" />
          <div class="apiItemPart"><span>{{a.method}}</span>{{a.uri}}</div>
        </li>
      </ul>
      <template slot="footer">
        <button @click="doSend">선택</button>
      </template>
    </ApiModal>
  </div>
</template>

<script>
import ApiModal from './ApiModal.vue'
import MonitoringOperation from '../operations/MonitoringOperation';
export default {
  components: { ApiModal },
  data() {
    return {
      apis: [],
      selected: [],
      selectAll: false,
      modal: false,
      message: '',
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      MonitoringOperation.getApiData()
      .then((data) => {
        this.apis = data.apis.map((api) => {
          return {
            apiId: api.apiId,
            method: api.method,
            uri: api.uri,
          };
        });
        this.apis[0].uri = '/monitoring/v1.0/aaa/aaa/aaa/aaa/aaa/aaa/aaa/aaa';
        this.apis[1].uri = '/monitoring/v1.0/bbb/bbb/bbb/bbb/bbb/bbb/bbb/bbb/bbb/bbb';
        this.apis[2].uri = '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc';
        this.apis.push({
          apiId: 9901,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });
        this.apis.push({
          apiId: 9902,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });
        this.apis.push({
          apiId: 9903,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });
        this.apis.push({
          apiId: 9904,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });
        this.apis.push({
          apiId: 9905,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });        
        this.apis.push({
          apiId: 9906,
          method: 'GET',
          uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        });
        console.log(`load() - apis: ${JSON.stringify(this.apis, null, 4)}`);
      })
    },
		select() {
      this.selected = [];
			if (!this.selectAll) {
				for (let i in this.apis) {
					this.selected.push(this.apis[i].apiId);
				}
			}
		},
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        alert('메세지를 입력하세요.')
      }
    }
  }
}
</script>

<style lang="scss">
.dialogTitle {
  // background-color: royalblue;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid lightgray;
}
.apiList {
  margin: 0;
  padding: 0;
}
.apiItem {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  word-break: break-all;
}
.apiItemPart {
  margin-left: 5px;
}
</style>
