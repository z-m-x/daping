<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="车牌号" prop="carNo">
        <el-input
          v-model="queryParams.carNo"
          placeholder="请输入车牌号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车辆类型" prop="carType">
        <el-select v-model="queryParams.carType" placeholder="请选择车辆类型" clearable>
          <el-option
            v-for="dict in dict.type.car_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="油升类型" prop="refuelType">
        <el-select v-model="queryParams.refuelType" placeholder="请选择油升类型" clearable>
          <el-option
            v-for="dict in dict.type.refuel_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="加油时间">
        <el-date-picker
          v-model="daterangeRefuelDate"
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
          v-hasPermi="['carRefuel:refuel:add']"
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
          v-hasPermi="['carRefuel:refuel:edit']"
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
          v-hasPermi="['carRefuel:refuel:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['carRefuel:refuel:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="refuelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="唯一" align="center" prop="refId" />
      <el-table-column label="车牌号" align="center" prop="carNo" />
      <el-table-column label="车辆类型" align="center" prop="carType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.car_type" :value="scope.row.carType"/>
        </template>
      </el-table-column>
      <el-table-column label="油升L" align="center" prop="refuelSum" />
      <el-table-column label="油升类型" align="center" prop="refuelType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.refuel_type" :value="scope.row.refuelType"/>
        </template>
      </el-table-column>
      <el-table-column label="加油时间" align="center" prop="refuelDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.refuelDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['carRefuel:refuel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['carRefuel:refuel:remove']"
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

    <!-- 添加或修改车辆加油记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="车牌号" prop="carNo">
          <el-input v-model="form.carNo" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车辆类型" prop="carType">
          <el-select v-model="form.carType" placeholder="请选择车辆类型">
            <el-option
              v-for="dict in dict.type.car_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油升L" prop="refuelSum">
          <el-input v-model="form.refuelSum" placeholder="请输入油升L" />
        </el-form-item>
        <el-form-item label="油升类型" prop="refuelType">
          <el-select v-model="form.refuelType" placeholder="请选择油升类型">
            <el-option
              v-for="dict in dict.type.refuel_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加油时间" prop="refuelDate">
          <el-date-picker clearable
            v-model="form.refuelDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择加油时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRefuel, getRefuel, delRefuel, addRefuel, updateRefuel } from "@/api/carRefuel/refuel";

export default {
  name: "Refuel",
  dicts: ['refuel_type', 'car_type'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 车辆加油记录表格数据
      refuelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 加油时间时间范围
      daterangeRefuelDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        carNo: null,
        carType: null,
        refuelType: null,
        refuelDate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        carId: [
          { required: true, message: "车辆备案号不能为空", trigger: "change" }
        ],
        carNo: [
          { required: true, message: "车牌号不能为空", trigger: "blur" }
        ],
        carType: [
          { required: true, message: "车辆类型不能为空", trigger: "change" }
        ],
        refuelSum: [
          { required: true, message: "油升L不能为空", trigger: "blur" }
        ],
        refuelType: [
          { required: true, message: "油升类型不能为空", trigger: "change" }
        ],
        refuelDate: [
          { required: true, message: "加油时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询车辆加油记录列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeRefuelDate && '' != this.daterangeRefuelDate) {
        this.queryParams.params["beginRefuelDate"] = this.daterangeRefuelDate[0];
        this.queryParams.params["endRefuelDate"] = this.daterangeRefuelDate[1];
      }
      listRefuel(this.queryParams).then(response => {
        this.refuelList = response.rows;
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
        refId: null,
        carId: null,
        carNo: null,
        carType: null,
        refuelSum: null,
        refuelType: null,
        refuelDate: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeRefuelDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.refId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加车辆加油记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const refId = row.refId || this.ids
      getRefuel(refId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改车辆加油记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.refId != null) {
            updateRefuel(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRefuel(this.form).then(response => {
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
      const refIds = row.refId || this.ids;
      this.$modal.confirm('是否确认删除车辆加油记录编号为"' + refIds + '"的数据项？').then(function() {
        return delRefuel(refIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('carRefuel/refuel/export', {
        ...this.queryParams
      }, `refuel_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
