# leocloud-beeyond

Beeyond is a project aimed to providing HTL Leonding students an effortless access to Kubernetes and allow efficient testing and deployment of their applications.

## ⚓ Kubernetes Deployment

Beeyond is deployed in the LeoCloud and is accessible at:

- Frontend: https://student.cloud.htl-leonding.ac.at/m.remplbauer/beeyond
- Backend: https://student.cloud.htl-leonding.ac.at/m.remplbauer/beeyond-backend

## 🚀 Deploying Beeyond

### Deployment using Kubernetes manifests

When deploying using Kubernetes manifests, you need update some parts of the manifests to match your environment:

- you need to update the `path` field for the `ingress` of the `leocloud-beeyond-frontend` and `leocloud-beeyond-backend` deployment to match the `username` of the namespace it should be deployed in following the format `/<username>/beeyond(/|$)(.*)$`

- you need to update the `$BASE_PATH` and `$API_URL` environment variables in the `leocloud-beeyond-frontend` deployment to match the `username` of the namespace it should be deployed in

With the updated manifests, you can deploy Beeyond using:

```sh
kubectl apply -f k8s-manifests
```

### Deployment using Helm

When deploying using Helm, you need to update `username` field in the `values.yaml` file of the helm chart to match your environment:

Now you can create the initial deployment using:

```sh
helm install leocloud-beeyond helm
```

To upgrade a existing deployment, run the following command:

```sh
helm upgrade leocloud-beeyond helm
```
