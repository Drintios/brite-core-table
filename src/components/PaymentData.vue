<template>
  <div v-if="processedData.length">
    <h1>Here you can see and interact with payment data!</h1>
    <h3>Search in table!</h3>
    <input type="text" placeholder="search" v-model="search" />
    <div>
      <date-picker v-model="time" :first-day-of-week="1" :lang="lang"></date-picker>
    </div>
    <div>
      <button @click="filterByDate('year', time)">Data on this year</button>
      <button @click="filterByDate('week', time)">Data on this week</button>
      <button @click="filterByDate('month', time)">Data on this month</button>
      <button @click="filterByDate('day', time)">Data on this day</button>
    </div>
    <div>
      <button @click="filterByDate()">Full data</button>
    </div>
    <DataTable :headers="headers" :data="processedData" :search="search" @dataUpdated="handleUpdate" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
import DataTable from './common/DataTable.vue';

export default {
  name: 'PaymentData',
  components: {
    DataTable,
    DatePicker,
  },
  data() {
    return {
      search: '',
      filteredData: [],
      time: new Date(),
      lang: {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
        placeholder: {
          date: 'Select Date',
          dateRange: 'Select Date Range'
        }
      },
      headers: [
        {
          text: 'ID',
          key: 'ID',
          sortable: true,
          width: '400px',
        },
        {
          text: 'Name',
          key: 'Name',
          sortable: true,
          width: '200px',
        },
        {
          text: 'Description',
          key: 'Description',
          sortable: true,
          editable: true,
          width: '600px',
        },
        {
          text: 'Date',
          key: 'Date',
          sortable: true,
          width: '250px',
        },
        {
          text: 'Amount',
          key: 'Amount',
          sortable: true,
          width: '100px',
        },
      ],
    };
  },
  computed: {
    processedData() {
      // Get data from firebase by vuex action and properly organize it for table.
      if (this.filteredData.length) {
        return this.filteredData;
      }
      this.getPaymentData();
      const newData = [];
      for (const data in this.$store.state.paymentData) {
        let carrierObj = {};
        carrierObj.ID = data;
        carrierObj = { ...carrierObj, ...this.$store.state.paymentData[data] };
        newData.push(carrierObj);
      }
      return newData;
    },
  },
  methods: {
    filterByDate(range, date) {
      // Filters data by date using momentjs.
      // It will allow to filter based on different ranges.
      const formatDate = moment(date).format();
      if (range && date) {
        this.filteredData = this.processedData.filter(data => data.Date && moment(data.Date).isSame(formatDate, range));
      } else {
        this.filteredData = [];
      }
    },
    handleUpdate(data) {
      // Used to update the backend.
      this.setPaymentData([data.ID, data.Name, data.Description, data.Date, data.Amount]);
    },
    ...mapActions({
      getPaymentData: 'GET_PAYMENT_DATA',
      setPaymentData: 'SET_PAYMENT_DATA',
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
