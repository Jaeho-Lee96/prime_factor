# Prime_Factor

리포지토리 주소 : https://github.com/Jaeho-Lee96/prime_factor

## 1. 프로젝트 개요

The prime factors of 13195 are 5, 7, 13 and 29 (5 * 7 * 13 * 29 = 13195), and the largest prime factor is 29.
Implement a simple web server that can return the largest prime factor of the given number.



Requirements:
User docker / kubernetes (https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app).
Dockerfile & kubernetes yaml file must be included in your Github repository.
input range: 0~1000000



## 2. 실행 방법

node.js 환경에서 개발 했으며, npm을 사용합니다. 

```
npm start
```

http://localhost:8080/?input=13195 과 같이 사용하면 된다.

WSL2 환경에서 Docker를 사용했으며 다음과 같이 사용합니다. 

```
docker build -t gcr.io/forward-garden-292611/prime-node:v1 .
```

```
docker run -d -p 5000:8080 gcr.io gcr.io/forward-garden-292611/prime-node:v1 .
```

http://localhost:5000/?input=13195 과 같이 사용하면 됩니다. 

http://externalip/?input=13195 와 같이 쿠버네티스에 접근하면 됩니다. 



## DockerFile 및 prime-node-rc.yaml, prime-svc-node 파일

```dockerfile
FROM node:12
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["npm", "start"]
```

FROM node:12 node.js 12버전이 설치된 이미지를 기반으로 Docker 이미지 생성

WORKDIR 루트에 app 디렉토리 생성하고 Dockerfile 이 있는 경로의 모든 파일을 app에 복사 한 뒤 npm install로 디펜던시를 설치

가상화 된 환경에서 8080포트를 엶

컨테이너에서 npm start를 실행함



### prime-node-rc.yaml

```yaml
apiVersion: v1

kind: ReplicationController

metadata:
  name: prime-node-rc
spec:
  replicas: 3
  selector:
    app: prime-node
  template:
    metadata:
      name: prime-node-pod
      labels:
        app: prime-node

    spec:
      containers:
      - name: prime-node
        image: gcr.io/forward-garden-292611/prime-node:v1
        imagePullPolicy: Always
        ports:
        - containerPort: 8080

```

RC를 생성하며, Replica를 3개로 하여 3개의 pod를 생성 함. 컨테이너 이름은 prime-node-rc로 하며, 앞에서 활용한 도커를 이용해 컨테이너를 생성하며 포트는 8080을 사용합니다.  아래와 같이 생성 된 것을 확인 가능합니다. 

```
kubectl create -f hello-node-rc.yaml
```



![image](https://user-images.githubusercontent.com/62017716/98860093-7e799380-24a6-11eb-907a-d6c8d03d4597.png)



### prime-node-svc.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: prime-node-svc
spec:
  selector:
    app: prime-node
  ports:
    - port: 80
      protocol: TCP
      targetPort: 8080
  type: LoadBalancer

```

![image](https://user-images.githubusercontent.com/62017716/98860105-83d6de00-24a6-11eb-9e23-a08c02fc5130.png)

```
kubectl create -f hello-node-svc.yaml
```



## 4. 출력 결과
![image](https://user-images.githubusercontent.com/62017716/98860115-8802fb80-24a6-11eb-9a1c-9279ebb6e5b4.png)



![image](https://user-images.githubusercontent.com/62017716/98860303-ca2c3d00-24a6-11eb-8100-9ea3226617e0.png)

쿠버네티스 External IP는 이메일에 첨부 했습니다!



