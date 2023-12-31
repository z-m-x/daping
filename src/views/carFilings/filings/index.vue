<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
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
      <el-form-item label="车牌号" prop="carNo">
        <el-input
          v-model="queryParams.carNo"
          placeholder="请输入车牌号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="可承载重量" prop="carWeight">
        <el-input
          v-model="queryParams.carWeight"
          placeholder="请输入可承载重量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="司机姓名" prop="driverName">
        <el-input
          v-model="queryParams.driverName"
          placeholder="请输入司机姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证件类型" prop="identityType">
        <el-select v-model="queryParams.identityType" placeholder="请选择证件类型" clearable>
          <el-option
            v-for="dict in dict.type.identity_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="identityNo">
        <el-input
          v-model="queryParams.identityNo"
          placeholder="请输入证件号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
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
          v-hasPermi="['carFilings:filings:add']"
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
          v-hasPermi="['carFilings:filings:edit']"
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
          v-hasPermi="['carFilings:filings:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['carFilings:filings:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="filingsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="唯一" align="center" prop="carId" />
      <el-table-column label="车牌号" align="center" prop="carNo" />
      <el-table-column label="车辆类型" align="center" prop="carType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.car_type" :value="scope.row.carType"/>
        </template>
      </el-table-column>
      <el-table-column label="可承载重量" align="center" prop="carWeight" />
      <el-table-column label="司机姓名" align="center" prop="driverName" />
      <el-table-column label="证件类型" align="center" prop="identityType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.identity_type" :value="scope.row.identityType"/>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" align="center" prop="identityNo" />
      <el-table-column label="联系方式" align="center" prop="phone" />
      <el-table-column label="是否有效" align="center" prop="isStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_status" :value="scope.row.isStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['carFilings:filings:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['carFilings:filings:remove']"
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

    <!-- 添加或修改车辆备案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
        <el-form-item label="车牌号" prop="carNo">
          <el-input v-model="form.carNo" placeholder="请输入车牌号" style="width: 220px"/>
        </el-form-item>

        <el-form-item label="可承载重量" prop="carWeight">
          <el-input v-model="form.carWeight" placeholder="请输入可承载重量" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="司机姓名" prop="driverName">
          <el-input v-model="form.driverName" placeholder="请输入司机姓名" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="证件类型" prop="identityType">
          <el-select v-model="form.identityType" placeholder="请选择证件类型">
            <el-option
              v-for="dict in dict.type.identity_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件地址" prop="driverAddress">
          <el-input v-model="form.driverAddress" placeholder="请输入证件地址" style="width: 220px"/>
        </el-form-item>

        <el-form-item label="证件号码" prop="identityNo">
          <el-input v-model="form.identityNo" placeholder="请输入证件号码" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式" style="width: 220px"/>
        </el-form-item>
        <el-form-item label="是否有效" prop="isStatus">
          <el-radio-group v-model="form.isStatus">
            <el-radio
              v-for="dict in dict.type.is_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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
import { listFilings, getFilings, delFilings, addFilings, updateFilings } from "@/api/carFilings/filings";

export default {
  name: "Filings",
  dicts: ['is_status', 'identity_type', 'car_type'],
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
      // 车辆备案表格数据
      filingsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建时间时间范围
      daterangeCreateDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        carNo: null,
        carType: null,
        carWeight: null,
        driverName: null,
        identityType: null,
        identityNo: null,
        phone: null,
        createDate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        carNo: [
          { required: true, message: "车牌号不能为空", trigger: "blur" }
        ],
        carType: [
          { required: true, message: "车辆类型不能为空", trigger: "change" }
        ],
        isStatus: [
          { required: true, message: "是否有效不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询车辆备案列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateDate && '' != this.daterangeCreateDate) {
        this.queryParams.params["beginCreateDate"] = this.daterangeCreateDate[0];
        this.queryParams.params["endCreateDate"] = this.daterangeCreateDate[1];
      }
      listFilings(this.queryParams).then(response => {
        this.filingsList = response.rows;
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
        carId: null,
        carNo: null,
        carType: null,
        carWeight: null,
        driverName: null,
        driverAddress: null,
        identityType: null,
        identityNo: null,
        phone: null,
        isStatus: '0',
        createDate: null
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
      this.daterangeCreateDate = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.carId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加车辆备案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const carId = row.carId || this.ids
      getFilings(carId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改车辆备案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.carId != null) {
            updateFilings(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFilings(this.form).then(response => {
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
      const carIds = row.carId || this.ids;
      this.$modal.confirm('是否确认删除车辆备案编号为"' + carIds + '"的数据项？').then(function() {
        return delFilings(carIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('carFilings/filings/export', {
        ...this.queryParams
      }, `filings_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
