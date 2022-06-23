// 程式出現重大錯誤
process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error('UnCaught Exception!');
  console.error(err);
  process.exit(1);
});

// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection: ', promise);
  console.error('原因: ', err);
})