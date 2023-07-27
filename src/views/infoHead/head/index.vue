<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="始发地" prop="origin">
        <el-input
          v-model="queryParams.origin"
          placeholder="请输入始发地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目的地" prop="destination">
        <el-input
          v-model="queryParams.destination"
          placeholder="请输入目的地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调度时间">
        <el-date-picker
          v-model="daterangeDispatchDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="车牌号" prop="carNo">
        <el-input
          v-model="queryParams.carNo"
          placeholder="请输入车牌号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="驾驶员姓名" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入驾驶员姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计始发时间">
        <el-date-picker
          v-model="daterangeStartDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预计目的时间">
        <el-date-picker
          v-model="daterangeEndDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="记录时间">
        <el-date-picker
          v-model="daterangeCreateDate"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['infoHead:head:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['infoHead:head:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['infoHead:head:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['infoHead:head:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="headList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="infoHeadId" />
      <el-table-column label="始发地" align="center" prop="origin" />
      <el-table-column label="目的地" align="center" prop="destination" />
      <el-table-column label="调度时间" align="center" prop="dispatchDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dispatchDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆ID" align="center" prop="carId" />
      <el-table-column label="车牌号" align="center" prop="carNo" />
      <el-table-column label="车辆类型" align="center" prop="carType" />
      <el-table-column label="驾驶员姓名" align="center" prop="driverName" />
      <el-table-column label="公里数" align="center" prop="kilometer" />
      <el-table-column label="预计油耗" align="center" prop="consumption" />
      <el-table-column label="预计始发时间" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计目的时间" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地图位子ID" align="center" prop="mapId" />
      <el-table-column label="A点地图坐标" align="center" prop="aPosition" />
      <el-table-column label="A点地图描述" align="center" prop="aPositionName" />
      <el-table-column label="B点地图坐标" align="center" prop="bPosition" />
      <el-table-column label="B点地图描述" align="center" prop="bPositionName" />
      <el-table-column label="记录时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总量(吨)" align="center" prop="weightCount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['infoHead:head:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['infoHead:head:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改车辆调度主对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="始发地" prop="origin">
          <el-input v-model="form.origin" placeholder="请输入始发地" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="目的地" prop="destination">
          <el-input v-model="form.destination" placeholder="请输入目的地" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="调度时间" prop="dispatchDate">
          <el-date-picker clearable
            v-model="form.dispatchDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择调度时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNo">
          <el-input v-model="form.carNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="驾驶员姓名" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入驾驶员姓名" />
        </el-form-item>
        <el-form-item label="公里数" prop="kilometer">
          <el-input v-model="form.kilometer" placeholder="请输入公里数" />
        </el-form-item>
        <el-form-item label="预计油耗" prop="consumption">
          <el-input v-model="form.consumption" placeholder="请输入预计油耗" />
        </el-form-item>
        <el-form-item label="预计始发时间" prop="startDate">
          <el-date-picker clearable
            v-model="form.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预计始发时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计目的时间" prop="endDate">
          <el-date-picker clearable
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预计目的时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地图组名称" prop="aPosition">
          <el-input v-model="form.mapId" placeholder="请输入地图组名称" />
        </el-form-item>
        <el-form-item label="A点地图坐标" prop="aPosition">
          <el-input v-model="form.aPosition" placeholder="请输入A点地图坐标" />
        </el-form-item>
        <el-form-item label="A点地图描述" prop="aPositionName">
          <el-input v-model="form.aPositionName" placeholder="请输入A点地图描述" />
        </el-form-item>
        <el-form-item label="B点地图坐标" prop="bPosition">
          <el-input v-model="form.bPosition" placeholder="请输入B点地图坐标" />
        </el-form-item>
        <el-form-item label="B点地图描述" prop="bPositionName">
          <el-input v-model="form.bPositionName" placeholder="请输入B点地图描述" />
        </el-form-item>
        <el-form-item label="记录时间" prop="createDate">
          <el-date-picker clearable
            v-model="form.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择记录时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="总量(吨)" prop="weightCount">
          <el-input v-model="form.weightCount" placeholder="请输入总量(吨)" />
        </el-form-item>
        <el-divider content-position="center">车辆调度体信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddCarInfoBody">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteCarInfoBody">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="carInfoBodyList" :row-class-name="rowCarInfoBodyIndex" @selection-change="handleCarInfoBodySelectionChange" ref="carInfoBody">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="装载重量" prop="goodsWeight" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsWeight" placeholder="请输入装载重量" />
            </template>
          </el-table-column>
          <el-table-column label="货物名称" prop="goodsName" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodsName" placeholder="请输入货物名称" />
            </template>
          </el-table-column>
          <el-table-column label="货物类型" prop="goodsType" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.goodsType" placeholder="请选择货物类型">
                <el-option
                  v-for="dict in dict.type.goods_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listHead, getHead, delHead, addHead, updateHead } from "@/api/infoHead/head";

export default {
  name: "Head",
  dicts: ['goods_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedCarInfoBody: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 车辆调度主表格数据
      headList: [],
      // 车辆调度体表格数据
      carInfoBodyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 外键关联时间范围
      daterangeDispatchDate: [],
      // 外键关联时间范围
      daterangeStartDate: [],
      // 外键关联时间范围
      daterangeEndDate: [],
      // 外键关联时间范围
      daterangeCreateDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        origin: null,
        destination: null,
        dispatchDate: null,
        carId: null,
        carNo: null,
        carType: null,
        driverName: null,
        startDate: null,
        endDate: null,
        mapId: null,
        createDate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        carId: [
          { required: true, message: "车辆ID不能为空", trigger: "change" }
        ],
        mapId: [
          { required: true, message: "地图位子ID不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询车辆调度主列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDispatchDate && '' != this.daterangeDispatchDate) {
        this.queryParams.params["beginDispatchDate"] = this.daterangeDispatchDate[0];
        this.queryParams.params["endDispatchDate"] = this.daterangeDispatchDate[1];
      }
      if (null != this.daterangeStartDate && '' != this.daterangeStartDate) {
        this.queryParams.params["beginStartDate"] = this.daterangeStartDate[0];
        this.queryParams.params["endStartDate"] = this.daterangeStartDate[1];
      }
      if (null != this.daterangeEndDate && '' != this.daterangeEndDate) {
        this.queryParams.params["beginEndDate"] = this.daterangeEndDate[0];
        this.queryParams.params["endEndDate"] = this.daterangeEndDate[1];
      }
      if (null != this.daterangeCreateDate && '' != this.daterangeCreateDate) {
        this.queryParams.params["beginCreateDate"] = this.daterangeCreateDate[0];
        this.queryParams.params["endCreateDate"] = this.daterangeCreateDate[1];
      }
      listHead(this.queryParams).then(response => {
        this.headList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        infoHeadId: null,
        origin: null,
        destination: null,
        dispatchDate: null,
        carId: null,
        carNo: null,
        carType: null,
        driverName: null,
        kilometer: null,
        consumption: null,
        startDate: null,
        endDate: null,
        mapId: null,
        aPosition: null,
        aPositionName: null,
        bPosition: null,
        bPositionName: null,
        createDate: null,
        weightCount: null
      };
      this.carInfoBodyList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeDispatchDate = [];
      this.daterangeStartDate = [];
      this.daterangeEndDate = [];
      this.daterangeCreateDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.infoHeadId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加车辆调度主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const infoHeadId = row.infoHeadId || this.ids
      getHead(infoHeadId).then(response => {
        this.form = response.data;
        this.carInfoBodyList = response.data.carInfoBodyList;
        this.open = true;
        this.title = "修改车辆调度主";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.carInfoBodyList = this.carInfoBodyList;
          if (this.form.infoHeadId != null) {
            updateHead(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHead(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const infoHeadIds = row.infoHeadId || this.ids;
      this.$modal.confirm('是否确认删除车辆调度主编号为"' + infoHeadIds + '"的数据项？').then(function() {
        return delHead(infoHeadIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
	/** 车辆调度体序号 */
    rowCarInfoBodyIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 车辆调度体添加按钮操作 */
    handleAddCarInfoBody() {
      let obj = {};
      obj.goodsWeight = "";
      obj.goodsName = "";
      obj.goodsType = "";
      this.carInfoBodyList.push(obj);
    },
    /** 车辆调度体删除按钮操作 */
    handleDeleteCarInfoBody() {
      if (this.checkedCarInfoBody.length == 0) {
        this.$modal.msgError("请先选择要删除的车辆调度体数据");
      } else {
        const carInfoBodyList = this.carInfoBodyList;
        const checkedCarInfoBody = this.checkedCarInfoBody;
        this.carInfoBodyList = carInfoBodyList.filter(function(item) {
          return checkedCarInfoBody.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handleCarInfoBodySelectionChange(selection) {
      this.checkedCarInfoBody = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('infoHead/head/export', {
        ...this.queryParams
      }, `head_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
