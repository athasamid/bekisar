<template>
    <div class="animated fadeIn">
        <b-row class="mt-2">
            <b-col cols="3" md="3">
                <b-row>
                    <b-col cols="12"><h4>Pesan Terkirim</h4></b-col>
                </b-row>
            </b-col>
            <b-col cols="9" md="9">
                <b-pagination
                        align="right"
                        :total-rows="totalRows"
                        v-model="currentPage"
                        :per-page="perPage"/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="9">

            </b-col>
            <b-col cols="3">
                <b-form-input
                        align="right"
                        v-model="payload.filter"
                        @input="filterData"
                        placeholder="Masukkan pencarian..."/>
            </b-col>
        </b-row>
        <br/>
        <div class="position-relative">
            <b-table
                    stripped
                    hover
                    show-empty
                    responsive="hg"
                    ref="tabelSentitem"
                    :busy.sync="isBusy"
                    :fields="tableColumns"
                    :items="dataProvider"
                    :currentPage="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    empty-text="Tidak ada data"
                    empty-filtered-text="Tidak ada data yang sesuai dengan pencarian">
                <template slot="index" slot-scope="data">
                    {{ ((currentPage - 1) * 10) + data.index + 1 }}
                </template>
                <template slot="aksi" slot-scope="row">
                    <!--<b-btn size="sm" variant="primary" class="d-inline-block"><i class="fa fa-reply"></i> Balas</b-btn>-->
                    <!--<b-btn size="sm" variant="primary" class="d-inline-block"><i class="fa fa-forward"></i> Teruskan</b-btn>-->
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

    export default {
        components: {
            Chart,
        },
        data () {
            return {
                isBusy: false,
                totalRows: 0,
                perPage: 10,
                currentPage: 1,
                filter: '',
                sortBy: 'UpdatedInDB',
                sortDesc: true,
                tableColumns: {
                    index: {
                        label: 'No.'
                    },
                    updated_in_db: {
                        label: 'Updated In DB',
                        sortable: true,
                        formatter: v => format(v, 'D MMM YYYY HH:mm:ss', dateFnsBahasa),
                    },
                    insert_into_db: {
                        label: 'Insert Into DB',
                        sortable: true,
                        formatter: v => format(v, 'D MMM YYYY HH:mm:ss', dateFnsBahasa),
                    },
                    sending_date_time: {
                        label: 'Sending Date Time',
                        sortable: true
                    },
                    destination_number :{
                        label: 'Destination Number',
                        sortable: true
                    },
                    text_decoded: {
                        label: 'Text Decoded',
                        sortable: true
                    },
                    aksi : {
                        label: 'Aksi',
                        sortable: false
                    }
                },
                payload: {
                    filter: null
                }
            }
        },
        computed: {

        },
        methods: {
            dataProvider(ctx) {
                console.log('provider inbox')
                let sortBy = ctx.sortBy;

                switch (ctx.sortBy){
                    case 'updated_in_db':
                        sortBy = 'UpdatedInDB'
                        break;
                    case 'sending_date_time':
                        sortBy = 'SendingDateTime'
                        break;
                    case 'text':
                        sortBy = 'Text'
                        break;
                    case 'destination_number':
                        sortBy = 'DestinationNumber'
                        break
                    case 'text_decoded':
                        sortBy = 'TextDecoded'
                        break
                }

                let payload = {
                    page: ctx.currentPage,
                    filter: this.payload.filter,
                    sort: (sortBy != null ? sortBy : 'UpdatedInDB') + ':'+ (ctx.sortDesc ? 'desc' : 'asc')
                }

                let promise = axios.get(baseUrl+'/resources/sentitem', {params: payload})
                    .then(({data : {data, meta: {pagination}}}) => {
                        this.totalRows = pagination.total
                        this.perPage = pagination.per_page
                        this.currentPage = pagination.current_page

                        return data
                    }).catch(({response}) => {
                        return response
                    })

                promise.then(({status}) => {
                    if (status === 401) this.$route.push('login')
                })

                return promise
            },
            filterData (){
                this.$refs.tabelInbox.refresh()
            }
        },
        mounted () {

        }
    }
</script>

<style lang="scss" scoped>
    .box-orange {
        border-color: #F17300;
        background-color: lighten(#F17300, 50%);
        .display-4 { color: #F17300; }
    }
    .box-cyan {
        border-color: #5B7BC6;
        background-color: lighten(#5B7BC6, 40%);
        .display-4 { color: #5B7BC6 }
    }
    .box-blue {
        border-color: #19528C;
        background-color: lighten(#19528C, 62%);
        .display-4 { color: #19528C }
    }
    .box-green {
        border-color: #5A8436;
        background-color: lighten(#5A8436, 57%);
        .display-4 { color: #5A8436 }
    }
    .card-body .p.h4 {
        color: #33444c;
    }
    tr th:last-child {
        width: 50% !important;
    }
</style>
