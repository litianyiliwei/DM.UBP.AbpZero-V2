﻿//------------------------------------------------------------
// All Rights Reserved , Copyright (C)  
// 版本：1.0
/// <author>
///		<name></name>
///		<date>0001/1/1 0:00:00</date>
/// </author>
//------------------------------------------------------------

(function () {
    $(function () {
        var _$entityTable = $('#Job_SqlTable');
        var _appService = abp.services.ubp.job_Sql;

        var _permissions = {
            create: abp.auth.hasPermission('Pages.BackgroundJobManager.Job_Sql.Create'),
            edit: abp.auth.hasPermission('Pages.BackgroundJobManager.Job_Sql.Edit'),
            delete: abp.auth.hasPermission('Pages.BackgroundJobManager.Job_Sql.Delete')
        };

        var _createModal = new app.ModalManager({
            viewUrl: abp.appPath + 'BackgroundJobManager/Job_Sql/CreateModal',
            scriptUrl: abp.appPath + 'Areas/BackgroundJobManager/Views/Job_Sql/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditModal'
        });

        var _editModal = new app.ModalManager({
            viewUrl: abp.appPath + 'BackgroundJobManager/Job_Sql/EditModal',
            scriptUrl: abp.appPath + 'Areas/BackgroundJobManager/Views/Job_Sql/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditModal'
        });


        function getEntities() {
            _$entityTable.jtable('load');
        }


        abp.event.on('app.createOrEditModalSaved', function () {
            getEntities();
        });


        $('#CreateNewJob_SqlButton').click(function () {
            _createModal.open();
        });


        function deleteEntity(entity) {
            abp.message.confirm(
                app.localize('DeleteRecordWarningMessage'),
                function (isConfirmed) {
                    if (isConfirmed) {
                        _appService.deleteJob_Sql({
                            id: entity.id
                        }).done(function () {
                            getEntities();
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        };


        _$entityTable.jtable({
            title: app.localize('Job_Sql'),
            paging: true,
            sorting: true,
            multiSorting: true,
            actions: {
                listAction: {
                    method: _appService.getJob_Sql
                }
            },

            fields: {
                id: {
                    key: true,
                    list: false
                },
                actions: {
                    type: 'record-actions',
                    cssClass: 'btn btn-xs btn-primary blue',
                    text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                    items: [{
                        text: app.localize('Edit'),
                        visible: function () {
                            return _permissions.edit;
                        },
                        action: function (data) {
                            _editModal.open({ id: data.record.id });
                        }
                    },
                    {
                        text: app.localize('Delete'),
                        visible: function (data) {
                            return _permissions.delete;
                        },
                        action: function (data) {
                            deleteEntity(data.record);
                        }
                    }]
                },
                job_SqlName: {
                    title: app.localize('Job_SqlName'),
                    width: '20%',
                },
                commandType: {
                    title: app.localize('CommandType'),
                    width: '20%',
                    options: { '1': 'SQL语句', '2': '存储过程' }
                },
                commandText: {
                    title: app.localize('CommandText'),
                    width: '20%',
                },
                paramters: {
                    title: app.localize('Paramters'),
                    width: '20%',
                },
                description: {
                    title: app.localize('Description'),
                    width: '20%',
                },
            }
        });

        getEntities();
    });
})();
