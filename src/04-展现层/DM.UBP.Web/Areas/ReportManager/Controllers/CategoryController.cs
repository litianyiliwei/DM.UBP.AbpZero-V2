﻿//------------------------------------------------------------
// All Rights Reserved , Copyright (C)  
// 版本：1.0
/// <author>
///		<name></name>
///		<date>0001/1/1 0:00:00</date>
/// </author>
//------------------------------------------------------------

using System.Web.Mvc;
using System.Threading.Tasks;
using Abp.Runtime.Caching;
using Abp.Web.Mvc.Authorization;
using DM.UBP.Application.Dto.ReportManager.Categories;
using DM.UBP.Application.Service.ReportManager.Categories;
using DM.UBP.Domain.Service.ReportManager;
using DM.UBP.Web.Controllers;

namespace DM.UBP.Web.Areas.ReportManager.Controllers
{
    /// <summary>
    /// 报表分类的Controller
    /// <summary>
    [AbpMvcAuthorize(AppPermissions_ReportManager.Pages_ReportManager_Categories)]
    public class CategoryController : UBPControllerBase
    {
        private IReportCategoryAppService _CategoryAppService;
        public CategoryController(
           ICacheManager cacheManager,
           IReportCategoryAppService categoryappservice
           )
        {
            _CategoryAppService = categoryappservice;
        }

        public ActionResult Index()
        {
            return View();
        }

        [AbpMvcAuthorize(AppPermissions_ReportManager.Pages_ReportManager_Categories_Create)]
        public PartialViewResult CreateModal()
        {
            var viewModel = new ReportCategoryOutputDto()
            {
                
            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        [AbpMvcAuthorize(AppPermissions_ReportManager.Pages_ReportManager_Categories_Edit)]
        public async Task<PartialViewResult> EditModal(long id)
        {
            var viewModel = await _CategoryAppService.GetCategoryById(id);
            return PartialView("_CreateOrEditModal", viewModel);
        }

    }
}
