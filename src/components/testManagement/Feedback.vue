<template>
<div>
  <div class="feedback">
    <div class="function">
     <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-autocomplete
              placeholder="请输入商品名称"
              icon="search"
              v-model="input"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              >
            </el-autocomplete>
          </div>
        </el-col>
        
      </el-row>
     </div>
    <div id="table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="data.com_id"
          label="商品ID">
        </el-table-column>
        <el-table-column
          prop="data.com_name"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column
          prop="data.seller_id"
          label="卖">
        </el-table-column>
        <el-table-column
          prop="data.buyer_id"
          label="买"
          >
        </el-table-column>
        <el-table-column
          prop="data.comment"
          label="评论"
          >
        </el-table-column>
        <el-table-column
          :context="_self"
          inline-template
          label="操作"
          >
          <span>
            <el-button @click="onEditClick($index)" type="text" size="small">编辑</el-button>
            <el-button @click="onDelClick($index)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <div class="block">
    <!--
      current-page:一共有多少页
      handleSizeChange:显示每页有多少条数据
      handleCurrentChange：获得当前的页数
      page-sizes:选择每页显示多少条数据
      page-size:当前每页显示100条数据
      :total:一共有多少条数据
      每页第一个数据的下标：（页数-1）×每页数据的条数+1
      最后一页：（（页数-1）×每页数据的条数+1）到end
      最后一个数据的下标：数组长度减1
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="15"
      layout="prev, pager, next, jumper"
      >
    </el-pagination>
    
  </div>

 </div>
</template>


<script>
import Nothing from "../common/Nothing.vue"
import tableData from "../../mock/customerReviews.js"
export default {
  data() {
    return {
      input:'',
      tableData: tableData,
      number: "",
      data:[],
      currentPage:4,
      restaurants: [], //类别数组,
     
    };
  },
  components: {
    Nothing
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.axios
        .post("http://api.komavideo.com/news/list", {
          pageSize: 12,
          pageIndex: val,
          copyright: "osc"
        })
        .then(res => {
          this.tableData = res.data;
          console.log("点击了");
          console.log(res.data);
          console.log(val);
        });
      // //this.number=(val-1)*10+1
      //console.log(val)
      //console.log(this.number
    },
    //给出搜索建议
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      //调用callback返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return restaurant => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    loadAll() {
      // this.axios
      // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      // .then(response => (console.log(response)))
      // this.axios
      //   .get("http://119.23.216.28:8080/Erent/admin/AdminCategoryServlet?method=findAll"
      //   )
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // return this.data;
      return [
        { "value":"租赁" },
          { "value": "快递" },
          { "value": "包车" },
          { "value": "其他" }
      ]
    },

    handleSelect(item) {
      console.log(item.value);
    },

    onEditClick($index){
      
    }
  },
  mounted(){
    this.restaurants = this.loadAll();
  }
};
</script>


<style>
.block {
  text-align: center;
}
.function {
  margin-bottom: 10px;
}
.function button {
  float: right;
}
</style>
