<template>
  <div class="record-item">
    <div class="record-title">{{record.Type}}</div>

    <div class="record-date">{{record.Date}}</div>

    <div class="record-info">
      <p v-if="record.Type==='积分转出'">
        {{record.From}} 向 {{record.To}} 赠送了 {{record.Sum}} 积分
      </p>
      <p v-else-if="record.Type==='积分转入'">
        {{record.From}} 收到 {{record.To}} 赠送的 {{record.Sum}} 积分
      </p>
      <p v-else-if="record.Type==='积分兑换'">
        {{record.From}} 兑换了 {{record.To}} * {{record.Amount}} ,花费 {{record.Sum}} 积分
      </p>
      <p v-else-if="record.Type==='报名参赛'">
        {{record.From}} 报名 {{record.To}} 比赛,报名费 {{record.Sum}} 积分
      </p>
      <p v-else>
        未知错误
      </p>
      <p>备注信息： {{record.Remarks}}</p>
      <p class="red">剩余积分： {{record.Balance}}</p>
      <p>订单状态： {{record.Status}}</p>

    </div>


  </div>
</template>

<script>
  export default {
    name: "RecordItem",
    props: {
      record: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>

<style scoped>
  .record-item {
    margin: 10px auto;
    padding: 15px;
    border: 1px solid #666666;
    border-radius: 10px;
    height: auto;
    width: 100%;
  }

  .record-title {
    font-size: 16px;
    line-height: 16px;
  }

  .record-date {
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .record-info {
    margin: 0 auto;
    width: 100%;
    position: relative;
    font-size: 14px;
  }

  .red {
    color: #ff5f3e;
  }
</style>
