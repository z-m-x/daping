<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="createDate">
        <el-input
          v-model="queryParams.createDate"
          placeholder="请输入创建时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装卸点位名称" prop="mapName">
        <el-input
          v-model="queryParams.mapName"
          placeholder="请输入装卸点位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="A点地图坐标" prop="aPosition">
        <el-input
          v-model="queryParams.aPosition"
          placeholder="请输入A点地图坐标"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="A点地图描述" prop="aPositionName">
        <el-input
          v-model="queryParams.aPositionName"
          placeholder="请输入A点地图描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="B点地图坐标" prop="bPosition">
        <el-input
          v-model="queryParams.bPosition"
          placeholder="请输入B点地图坐标"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="B点地图描述" prop="bPositionName">
        <el-input
          v-model="queryParams.bPositionName"
          placeholder="请输入B点地图描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['mapMax:max:add']"
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
          v-hasPermi="['mapMax:max:edit']"
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
          v-hasPermi="['mapMax:max:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['mapMax:max:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="maxList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="地图ID" align="center" prop="mapId" />
      <el-table-column label="创建时间" align="center" prop="createDate" />
      <el-table-column label="装卸点位名称" align="center" prop="mapName" />
      <el-table-column label="A点地图坐标" align="center" prop="aPosition" />
      <el-table-column label="A点地图描述" align="center" prop="aPositionName" />
      <el-table-column label="B点地图坐标" align="center" prop="bPosition" />
      <el-table-column label="B点地图描述" align="center" prop="bPositionName" />
      <el-table-column label="是否有效" align="center" prop="isStatus" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mapMax:max:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mapMax:max:remove']"
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

    <!-- 添加或修改地图统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="创建时间" prop="createDate">
          <el-input v-model="form.createDate" placeholder="请输入创建时间" />
        </el-form-item>
        <el-form-item label="装卸点位名称" prop="mapName">
          <el-input v-model="form.mapName" placeholder="请输入装卸点位名称" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMax, getMax, delMax, addMax, updateMax } from "@/api/mapMax/max";

export default {
  name: "Max",
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
      // 地图统计表格数据
      maxList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        createDate: null,
        mapName: null,
        aPosition: null,
        aPositionName: null,
        bPosition: null,
        bPositionName: null,
        isStatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询地图统计列表 */
    getList() {
      this.loading = true;
      listMax(this.queryParams).then(response => {
        this.maxList = response.rows;
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
        mapId: null,
        createDate: null,
        mapName: null,
        aPosition: null,
        aPositionName: null,
        bPosition: null,
        bPositionName: null,
        isStatus: null
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.mapId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加地图统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const mapId = row.mapId || this.ids
      getMax(mapId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改地图统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.mapId != null) {
            updateMax(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMax(this.form).then(response => {
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
      const mapIds = row.mapId || this.ids;
      this.$modal.confirm('是否确认删除地图统计编号为"' + mapIds + '"的数据项？').then(function() {
        return delMax(mapIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('mapMax/max/export', {
        ...this.queryParams
      }, `max_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
