# 인프런으로 배운 mocha이용법과 노마드 우버 코딩으로 배운 typescript실습해보기

### To do

- [x] server start to express server wtih typescript
- [x] test to test code
- [x] apply sequelize-typescript
- [x] user test code
- [x] user
- [ ] board test code
- [ ] board

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

### sequelize에서의 관계? join개념

- 항상 직접쿼리를 짰었던 나에게 조금 어색했던 개념
- 먼저 생각했던것: 유저는 여러가지 게시글을 가질수있고, 게시글은 하나의 유저 즉 작성자를 가질수있음

user모델

```
@HasMany(() => Board, "userId")
  boards?: Board[];
```

board모델

```
@BelongsTo(() => User, "userId")
  author!: User;
```

이렇게 구성해주었습니다. 타입스크립트를 쓰기때문에 유저는 boards를 가질수도 있고 안가질수있기때문에 ?로 해주었고,
author같은 경우는 반드시 들어가야하기때문에 !로 해주었습니다.
"userId"를 키로 이용해 조인을 한다는 뜻으로 이해하고 사용했습니다.
