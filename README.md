# 인프런으로 배운 mocha이용법과 노마드 우버 코딩으로 배운 typescript실습해보기

### To do

- [x] server start to express server wtih typescript
- [x] test to test code
- [x] apply sequelize-typescript

---

### 실수했던것

내가 sequelize-typescript를 적용할때 실수부분입니다.

```
export const sequelize = new Sequelize({
  database: "type_test",
  dialect: "mysql",
  username: "root",
  password: "PASSWORD",
  models: [__dirname + "/models"] // or [Player, Team],
});
```

sequelize-typescript공식문서를 찾아보며 따라했는데 models경로를 \_\_dirname + /models로 해놨으면서
처음에 models폴더가 경로 밖에 넣어두고 왜 안되지 하다가 발견했던부분입니다.
