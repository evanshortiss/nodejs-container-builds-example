# Node.js UBI Container Image Build & Size Guide

## Building 

Use the included *build.sh* script to build all the sample images using the included *Containerfile*(s).

*NOTE: This requires Docker or Podman to be installed*

```
git clone $REPO_URL nodejs-image-sizes
cd nodejs-image-sizes

./build.sh
```

## Viewing Container Image Sizes

Use the Podman/Docker images command:

```
podman images --format '{{.Size}} {{.Repository}} {{.Tag}}' | grep nodejs

661 MB localhost/nodejs-basic latest
211 MB localhost/nodejs-ts-basic-multistage-minimal latest
661 MB localhost/nodejs-ts-basic-multistage latest
832 MB localhost/nodejs-ts-basic-prune latest
831 MB localhost/nodejs-ts-basic latest
643 MB registry.access.redhat.com/ubi8/nodejs-18 latest
194 MB registry.access.redhat.com/ubi8/nodejs-18-minimal latest
```

Note that the *multistage-minimal* image is the smallest.