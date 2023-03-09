BINARY=$(which podman)

if [ -z "$BINARY" ]
then  
  BINARY=$(which docker)
fi

if [ -z "$BINARY" ]
then
  echo "Please enure Podman or Docker are installed and on the PATH"
  exit 1
fi

echo "Building images using ${BINARY}.\n"
echo "This will take while. Be patient!\n"

cd nodejs-basic
$BINARY build . -f Containerfile -t nodejs-basic

cd ../nodejs-ts-basic/

$BINARY build . -f Containerfile -t nodejs-ts-basic
$BINARY build . -f Containerfile.prune -t nodejs-ts-basic-prune
$BINARY build . -f Containerfile.multistage -t nodejs-ts-basic-multistage
$BINARY build . -f Containerfile.multistage.minimal -t nodejs-ts-basic-multistage-minimal

echo "\nFinished building all images! Use a command like this to compare their sizes:\n"
echo "$BINARY images --format '{{.Size}} {{.Repository}} {{.Tag}}' | grep nodejs"

