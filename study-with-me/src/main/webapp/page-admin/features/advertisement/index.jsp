<div class="row" id="Ads-table">
  <div class="col-12">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Advertisements</h3>
      </div>
      <div class="row p-2">
        <div class="col-6">
          <div class="btn-group">
            <button type="button" class="btn btn-primary btn-sm" onclick="swicthViewAds(false)">
              <i class="fa fa-plus"></i> Create
            </button>
          </div>
        </div>
        <div class="col-6">
          <div class="input-group input-group-sm float-right" style="width: 250px">
            <input type="text" name="table_search" class="form-control float-right" placeholder="Search" id=inpSearchAdsPosition oninput="onSearchByName()">
            <div class="input-group-append">
              <button type="submit" class="btn btn-default">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body table-responsive p-0">
        <table class="table table-head-fixed text-wrap table-sm table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Position</th>
              <th>Witdh</th>
              <th>Height</th>
              <th>Url</th>
              <th>Images</th>
              <th>Status</th>
              <th>Create By</th>
              <th>Create Date</th>
              <th>Updated By</th>
              <th>Updated Date</th>
              <th style="width: 95px;">Actions</th>
            </tr>
          </thead>
          <tbody id="tblAds">
          </tbody>
        </table>
        <div class="card-footer clearfix">
          <ul id="AdsPagination" class="pagination-sm float-right"></ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="row" id="Ads-form">
  <div class="col-12">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Create/Edit Ads</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="form-group" style="display: none">
          <label for="name">id</label> <input type="text" name="id" class="form-control" id="inpAdsId">
        </div>
         <div class="form-group">
          <label for="name">Position</label> <input class="form-control" placeholder="Position" id="inpAdsPosition">
        </div>
        <div class="form-group">
          <label for="name">Witdh</label> <input class="form-control" placeholder="Witdh" id="inpAdsWitdh">
        </div>
        <div class="form-group">
          <label for="name">Height</label> <input class="form-control" placeholder="Height" id="inpAdsHeight">
        </div>
        <div class="form-group">
          <label for="name">Images</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inpAdsImages"> <label class="custom-file-label" for="inpAdsImages">Choose file</label>
          </div>
        </div>
         <div class="form-group">
          <label for="name">Url</label> <input class="form-control" placeholder="Url" id="inpAdsUrl">
        </div>

        
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <div class="float-right">
          <button type="button" class="btn btn-default" onclick="draftAds()">
            <i class="fas fa-pencil-alt"></i> Draft
          </button>
          <button type="button" class="btn btn-primary" onclick="saveAds()">
            <i class="fas fa-save"></i> Save
          </button>
        </div>
        <button type="button" class="btn btn-default" onclick="swicthViewAds(true)">
          <i class="fas fa-times"></i> Discard
        </button>
      </div>
      <!-- /.card-footer -->
    </div>
    <!-- /.card -->
  </div>
</div>
<script src="${pageContext.request.contextPath}/page-admin/features/advertisement/index1.js"></script>