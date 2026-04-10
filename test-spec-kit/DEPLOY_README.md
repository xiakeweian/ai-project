# web 单平台部署文件

### 文件结构结构

```js
├── DEPLOY_README.md          // 说明文档
├── Dockerfile                // Docker  构建执行文件
├── jenkins-project.json      // jenkins 部署工作流描述
├── Jenkinsfile               // jenkins 构建入口配置文件
├── k8s-script.yaml           // k8s 部署配置文件
├── default.conf              // 内网nginx配置文件
```

### Dockerfile

需要确认构建目标输出目录是否是 `build` 文件夹，如不是需修改

### Jenkinsfile 

`Jenkins`构建环境模板，默认配置

###  default.conf

`nginx` 配置文件，默认配置

### jenkins-project.json 

`Jenkins`构建流程配置文件，需要调整以下内容（文件中搜索替换即可）

- test-spec-kit 内网构建配置域名 - @系统部申请的
<!-- - #imagePath#  docker 镜像目录 -->

### k8s-script.yaml

`K8s` 部署配置文件 ，需要调整以下内容（文件中搜索替换）

- test-spec-kit  一般就是你Jenkins项目的名称和上面域名一般保持一致就行
- undefined 找技术经理确认
- undefined 找技术经理确定