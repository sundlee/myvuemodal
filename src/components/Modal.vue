<template>
  <div class="example-modal-window">
    <p class="api-title">요청횟수</p>
    <button class="apiBtn apiSelectBtn" @click="openModal">API 선택</button>
    <button class="apiBtn" @click="openFilter">필터 추가</button>

    <div v-if="showFilterTable">
      <table class="bordered">
      <thead>
        <tr>
          <th>속성</th><th>연산</th><th>값</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select id="type">
              <option>호출횟수</option>
              <option>지연시간</option>
            </select>
          </td>
          <td>
            <select id="operator">
              <option>&lt;=</option>
              <option>&gt;=</option>
            </select>
          </td>
          <td>
            <input type="text" name="value">
          </td>
          <td>
            삭제
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <div class="dummy"></div>

    <ApiModal @close="closeModal" v-if="modal" :position="apiSelectBtnPosition">
      <!-- <div class="text-uppercase text-bold">id selected: {{selected}}</div> -->
      <template slot="header">
        <div class="dialogTitle">API 선택</div>
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
        <button class="apiBtn" @click="handleCancel">취소</button>
        <button class="apiBtn" @click="handleSelect">선택</button>
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
      showFilterTable: false,
      message: '',
      apiSelectBtnPosition: {},
    }
  },
  mounted() {
    this.load();
    const apiSelectBtn = document.querySelector('.apiSelectBtn');
    const rect = apiSelectBtn.getBoundingClientRect();
    this.apiSelectBtnPosition = { x: rect.x, y: rect.y };
    // console.log(rect);
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
        // this.apis.push({
        //   apiId: 9901,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });
        // this.apis.push({
        //   apiId: 9902,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });
        // this.apis.push({
        //   apiId: 9903,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });
        // this.apis.push({
        //   apiId: 9904,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });
        // this.apis.push({
        //   apiId: 9905,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });        
        // this.apis.push({
        //   apiId: 9906,
        //   method: 'GET',
        //   uri: '/monitoring/v1.0/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc/ccc',
        // });
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
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    handleCancel() {
      this.closeModal();
    },
    handleSelect() {
      console.log(`doSend() - selected: ${JSON.stringify(this.selected, null, 4)}`);
      this.closeModal();
    },
    openFilter() {
      this.showFilterTable = !this.showFilterTable;
    },
    closeFilter() {
      this.showFilterTable = false;
    },
  }
}
</script>

<style lang="scss">
.apiBtn {
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #fff;
  color: black;
  border: none;
  margin-right: 5px;
}
.apiBtn:hover {
  background-color: #e7e7e7;
}
.api-title {
  font-size: 28px;
  font-weight: bold;
  margin: 5px 0;
}
.dialogTitle {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
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
.bordered {
  margin-top: 5px;
  border-spacing: 0;
  border: solid #ccc 1px;
  border-radius: 6px;
  box-shadow: 0 1px 1px #ccc;
}
.bordered td, .bordered th {
  // border-left: 1px solid #ccc;
  // border-top: 1px solid #ccc;
  padding: 5px;
  text-align: left;
  font-size: 14px;
}
.bordered th {
  background-color: #e7e7e7;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
  border-top: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  font-size: 14px;
}
.bordered td:first-child, .bordered th:first-child {
  border-left: none;
}
.bordered th:first-child {
  border-radius: 6px 0 0 0;
}
.bordered th:last-child {
  border-radius: 0 6px 0 0;
}
.bordered th:only-child{
  border-radius: 6px 6px 0 0;
}
.bordered tr:last-child td:first-child {
  border-radius: 0 0 0 6px;
}
.bordered tr:last-child td:last-child {
  border-radius: 0 0 6px 0;
}
.dummy {
  width: 400px;
  height: 250px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
