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

## General Tips

This repository implements most of these tips for building better container images for Node.js applications:

1. Don’t run as root. Using OpenShift / Red Hat UBI takes care of this for you.
1. Use multi-stage builds to keep your containers lightweight.
1. Gracefully handle process signals to avoid abrupt interruptions to requests.
1. Avoid npm start, and consider using an init system such as tini.
1. Install necessary libraries and dependencies only.
1. Use a .dockerignore to avoid copying sensitive and unwanted files into container images.
1. Use a minimal/slim image for deployment, e.g the `minimal` variants of Red Hat's UBI images.
1. Use the Podman/Docker secrets feature to include potentially sensitive files at build-time, e.g a *.npmrc* file.
