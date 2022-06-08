# Prod, Staging, Dev enviornment
ENVIORNMENT=''
# Build identifier
BUNDLE_IDENTIFIER=$PRODUCT_BUNDLE_IDENTIFIER
# Name of the Crashlytics GoogleService-Info.plist
FIREBASE_CRASHLYTICS_INFO_PLIST=GoogleService-Info.plist
# Source location from where we have to copy GoogleService-Info.plist
PLIST_LOCATION=''
# Destination location to copy GoogleService-Info.plist
PLIST_DESTINATION=${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app

# Bundle ID's
AQGT_BUNDLE_ID_DEV=com.aqgt.aqgreen.dev
AQGT_BUNDLE_ID_STAGING=com.aqgt.aqgreen.staging
AQGT_BUNDLE_ID_PROD=com.aqgt.aqgreen.prod


function getEnviornment() {
    local env=$1
    case $env in
        $AQGT_BUNDLE_ID_DEV)
            ENVIORNMENT='Development'
        ;;
        $AQGT_BUNDLE_ID_STAGING)
            ENVIORNMENT='Staging'
        ;;
        $AQGT_BUNDLE_ID_PROD)
            ENVIORNMENT='Release'
        ;;
        *)
        echo 'Reason for build failure: Use valid bundle identifier. Check firebase.sh at location Firebase/'
        exit 1
        ;;
    esac
}

getEnviornment $BUNDLE_IDENTIFIER
PLIST_LOCATION=Crashlytics/${TARGET_NAME}/${ENVIORNMENT}/${FIREBASE_CRASHLYTICS_INFO_PLIST}

if [ -f $PLIST_LOCATION ]
then
    cp "${PLIST_LOCATION}" "${PLIST_DESTINATION}"
    "${PODS_ROOT}/FirebaseCrashlytics/run"
    echo "GoogleService-Info.plist has been copied successfully at ${PLIST_DESTINATION}"
else 
    echo "Reason for build failure: GoogleService-Info.plist is not available at ${PLIST_LOCATION}."
    exit 1
fi