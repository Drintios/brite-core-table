<template>
  <div class="table-wrapper">
    <table v-if="viewportWidth > 1024">
      <colgroup v-if="colums.length">
        <col
          v-for="header in headers"
          :key="header.key"
          :style="header.style"
          :width="header.width">
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            v-on="header.sortable ? { click: () => changeSort(header.key) } : {}">
            {{header.text}}
            <font-awesome-icon
              v-if="header.sortable"
              :icon="setSortIcon(header.key)" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="dataRow in processedData"
          :key="dataRow.ID">
          <td
            v-for="header in headers"
            :key="dataRow[header.key]">
            <div v-if="!header.editable">{{dataRow[header.key]}}</div>
            <div v-else>
              <div class="editable-cell" v-if="!edit[dataRow.ID]" @click="toggleEdit(dataRow.ID)">
                <span>{{dataRow[header.key]}} </span>
                <span class="edit-icon">
                  <font-awesome-icon
                  icon="edit" />
                </span>
              </div>
              <div v-else>
                <input type="text" :name="header.key" :id="dataRow.ID" :placeholder="'Write new ' + header.text" v-model="dataRow[header.key]">
                <button @click="emitUpdate(dataRow)">ok</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div
        v-for="dataRow in processedData"
        :key="dataRow.ID"
        class="collapsible"
        :class="{expanded: dataRow.ID === active}">
        <div class="collapse-trigger" @click="active = active ? undefined : dataRow.ID">
          <div>{{dataRow.ID}}</div>
          <div class="caret">
            <font-awesome-icon
              icon="caret-down" />
          </div>
        </div>
        <div class="content">
          <div
            v-for="(header, index) in headers"
            :key="index">
              <span class='title'>{{header.text}}:</span> {{dataRow[header.key]}}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: Array,
    data: Array,
    search: String,
  },
  data() {
    return {
      edit: {},
      viewportWidth: document.documentElement.clientWidth,
      active: '',
      sortBy: {
        key: this.headers[0].key,
        dir: 'asc',
      },
    };
  },
  mounted() {
    // We listen for resize events so we can display proper table.
    window.addEventListener('resize', () => this.viewportWidth = document.documentElement.clientWidth)
  },
  computed: {
    colums() {
      // Checks if header contains any styles or width for columns to apply using colgroup.
      if (this.headers.find(header => header.style || header.width)) {
        return this.headers;
      }
      return [];
    },
    processedData() {
      // Used to return sorted data and apply search filter.
      if (this.search.length) {
        return this.searchHandler(this.search).slice(0).sort(this.sortFunction);
      }
      return this.data.slice(0).sort(this.sortFunction);
    }
  },
  methods: {
    emitUpdate(data) {
      // Here we emit custom event to tell parent component of updated data.
      this.toggleEdit(data.ID);
      this.$emit('dataUpdated', data);
    },
    toggleEdit(id) {
      // To enable the edit for the specified id.
      if (this.edit[id]) {
        this.edit = {};
      } else {
        this.edit = {}
        this.edit[id] = true;
      }
    },
    searchHandler(string) {
      // Filters inside the array of objects and uses Array.some() to check each object property.
      return this.data.filter(row => Object.values(row).some(cell => cell.includes(string)));
    },
    setSortIcon(column) {
      // Sets proper sort icon.
      let sortIcon = 'sort';

      if (column === this.sortBy.key) {
        sortIcon = this.sortBy.dir === 'asc' ? 'sort-up' : 'sort-down';
      }

      return sortIcon;
    },
    sortFunction(a, b) {
      // Change direction of sort.
      const newA = this.sortBy.dir === 'asc' ? a : b;
      const newB = this.sortBy.dir === 'asc' ? b : a;

      // Check if there are letter presents in target to be sorted and use correct sort method.
      if (/[a-zA-Z]/.test(a[this.sortBy.key])) {
        // Ignore lower or uppercase.
        const upperA = newA[this.sortBy.key].toUpperCase();
        const upperB = newB[this.sortBy.key].toUpperCase();

        if (upperA < upperB) {
          return -1;
        } if (upperA > upperB) {
          return 1;
        }
        return 0;
      }
      return newA[this.sortBy.key] - newB[this.sortBy.key];
    },
    changeSort(column) {
      // Change column to be sorted and direction of sort.
      this.sortBy.key = column;
      this.sortBy.dir = this.sortBy.dir === 'asc' ? 'desc' : 'asc';
    },
  },
};
</script>

<style scoped>
  .editable-cell {
    cursor: pointer;
  }

  .editable-cell:hover .edit-icon {
    opacity: 1;
  }

  .edit-icon {
    opacity: .3;
  }

  .table-wrapper {
    max-width: 100vw;
  }

  .collapse-trigger {
    text-align: left;
    font-size: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    padding: 5px;
  }

  .collapse-trigger > div {
    display: flex;
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
  }

  .collapse-trigger .caret {
    width: 30px;
    display: flex;
    justify-content: center;
  }

  .collapsible:nth-child(even) .collapse-trigger {
    background-color: #e1e1e1;
  }

  .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height .7s;
    text-align: left;
  }

  .collapsible.expanded .content {
    max-height: 600px;
  }

  .title {
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    height: 50px;
    position: sticky;
    top: 0;
    background: white;
    z-index: 2;
  }

  th {
    border-bottom: 1px solid grey;
  }

  tr:nth-child(even) {
    background: #e1e1e1;
  }

  td {
    height: 45px;
    border-bottom: 1px solid grey;
  }
</style>
