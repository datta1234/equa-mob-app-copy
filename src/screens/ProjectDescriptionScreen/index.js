import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { equals, map, partialRight, pick, pipe } from 'ramda';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from 'components';
import Button from 'components/Button';
import Description from 'components/Description';
import { ROOT_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

import { withQuery, withLoader } from './hocs';
import Carousel from './shared/Carousel';
import ProjectTitleCard from './shared/ProjectTitleCard';
import {
  ImageContainer,
  Container,
  ContentContainer,
  ContentItemContainer,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  LinkIcon,
  IconContainer,
  IconsContainer,
  Separator,
  CloseIcon,
  CloseIconContainer,
  ShareIcon,
  HeaderContainer,
  ImagegradientOverlay,
  CloseIconWrapper,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ProjectInfoModalScreen({ project }) {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const onpeUrl = async ({ url }) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderStandart = ({ id, thumbnailLogo }) => (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
      }}>
      <FastImage
        style={{ width: 160, height: 40 }}
        source={{
          uri: thumbnailLogo,
          priority: FastImage.priority.normal,
        }}
        // resizeMode={FastImage.resizeMode.contain}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

  const renderStandarts = map(renderStandart);

  const renderDevelopmentGoal = ({ id, thumbnailLogo }) => (
    <View style={{ margin: 5 }}>
      <FastImage
        style={{ width: 80, height: 80 }}
        source={{
          uri: thumbnailLogo,
          priority: FastImage.priority.normal,
        }}
        // resizeMode={FastImage.resizeMode.contain}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

  const renderDevelopmentGoals = map(renderDevelopmentGoal);

  const goToNotificationScreen = ({ title, subtitle }) =>
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type: 'warning',
        title,
        subtitle,
      },
    });

  const goToInviteNotificationScreen = () =>
    goToNotificationScreen({
      title: translator.translate('modals.comingSoon.title'),
      subtitle: translator.translate('modals.comingSoon.subtitle'),
      // subtitle: '- Share the link on any social platform',
    });

  return (
    <View style={{ flex: 1 }}>
      <CloseIconWrapper>
        <TouchableOpacity onPress={goBack}>
          <CloseIconContainer>
            <CloseIcon />
          </CloseIconContainer>
        </TouchableOpacity>
      </CloseIconWrapper>

      <Container
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y <= -140) {
            goBack(); // experiment
          }
        }}>
        <SafeAreaView edges={['bottom']}>
          <HeaderContainer>
            <View />
            {/* <View style={{ position: 'absolute' }}>
          <TouchableOpacity onPress={goBack}>
            <CloseIconContainer>
              <CloseIcon />
            </CloseIconContainer>
          </TouchableOpacity>
        </View> */}
            <TouchableOpacity onPress={goToInviteNotificationScreen}>
              <ShareIcon />
            </TouchableOpacity>
          </HeaderContainer>

          <ImageContainer>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: project.thumbnailBackground,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            {/* <Image
          source={{ uri: project.thumbnailBackground }}
          style={{ width: '100%', height: '100%', flex: 1 }}
        /> */}

            <ImagegradientOverlay />
          </ImageContainer>

          <ContentContainer style={{ marginTop: -175 }}>
            <ContentItemContainer>
              <ProjectTitleCard project={project} />
            </ContentItemContainer>
          </ContentContainer>

          <ContentContainer>
            <ContentItemContainer>
              <Typography.Title mode="dark">
                {translator.translate('modals.projectDescription.overview')}
              </Typography.Title>
            </ContentItemContainer>

            <ContentItemContainer>
              <Typography.Text mode="dark">
                {project.description}
                {/* There are five sites in this group project, distributed across the
            Yorkshire Dales National Park. They range from Arkengarthdale in the
            northern dales, an area characterised by broad, sweeping fells and
            steep-sided valleys, to Wharfedale in the south with an intricate
            pattern of undulating hills, field boundaries and mixed woodland.{' '} */}
              </Typography.Text>
            </ContentItemContainer>

            {/* <ContentItemContainer>
          <Typography.Text mode="dark">
            Planting was carried out between 2007 and 2010 with 30.1ha planted
            in 5 small projects throughout the Dales. The species mix include:
            28% Birch, 14% Ash, 12% Rowan, 9% Pine spp., 8% alder, 6% Oak, 7%
            other native broadleaves, 17% native shrubs.
          </Typography.Text>
        </ContentItemContainer> */}
          </ContentContainer>

          <ContentItemContainer>
            <Carousel />
          </ContentItemContainer>

          {/* <ContentContainer>
        <ContentItemContainer>
          <Typography.Title mode="dark" level={3}>
            Objective
          </Typography.Title>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Text mode="dark">
            One of the major objectives of the Dales Woodland Strategy is the
            creation of new native woodland in the Yorkshire Dales. Currently,
            only 2.5% of the National Park is covered with native broadleaf
            trees compared with the national average of 8%. The long term aim is
            to almost double the amount of broadleaf cover in the National Park
            to 5000 hectares by 2020.
          </Typography.Text>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Text mode="dark">
            The Yorkshire Dales Millennium Trust is working with local
            landowners, the National Park Authority and other interested parties
            to help achieve these goals and the creation of this group scheme
            forms part of their strategy. It is hoped that income through the
            sale of carbon that will facilitate further increases in the amount
            of native broadleaf tree cover.
          </Typography.Text>
        </ContentItemContainer>
      </ContentContainer> */}

          {/* <ContentItemContainer>
          <Description>
            <Description.Item label="business">
              Alianz Car Insurance
            </Description.Item>
            <Description.Item label="code">LV12345678</Description.Item>
            <Description.Item label="category">Medium car</Description.Item>
          </Description>
        </ContentContainer> */}

          <ContentContainer>
            <ContentItemContainer>
              <Description mode="dark">
                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.status',
                  )}>
                  {project.status}
                </Description.Item>
                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.location',
                  )}>
                  {project.location}
                </Description.Item>
                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.developer',
                  )}>
                  {project.developer}
                </Description.Item>

                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.verified',
                  )}>
                  {project.verification}
                </Description.Item>

                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.emissionReduction',
                  )}>
                  {project.emissionReduction}
                </Description.Item>

                <Description.Item
                  label={translator.translate(
                    'modals.projectDescription.descriptionBlock.keys.regDate',
                  )}>
                  {project.registrationDate}
                </Description.Item>

                {/* <Description.Item label="Reference">
                  103000000000756
                </Description.Item> */}
              </Description>
            </ContentItemContainer>
          </ContentContainer>

          <ContentContainer>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {renderStandarts(project.standards)}
            </View>
          </ContentContainer>

          <ContentContainer>
            <ContentItemContainer>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Button
                    level={5}
                    onPressHandler={() =>
                      onpeUrl({ url: project.websiteLink })
                    }>
                    {translator.translate(
                      'modals.projectDescription.buttons.projectWebsite',
                    )}
                  </Button>
                </View>

                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Button
                    onPressHandler={() => onpeUrl({ url: project.webcamLink })}
                    level={5}>
                    {translator.translate(
                      'modals.projectDescription.buttons.projectWebcam',
                    )}
                  </Button>
                </View>
              </View>
            </ContentItemContainer>
          </ContentContainer>

          <ContentContainer>
            <Separator />
          </ContentContainer>

          {/* <ContentContainer>
        <ContentItemContainer>
          <Typography.Title mode="dark">The Plan</Typography.Title>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Title mode="dark" level={3}>
            Objective
          </Typography.Title>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Text mode="dark">
            All projects can either be seen from public rights of way or have
            footpaths next to or through them and have been designed to enhance
            the landscape. Lamberts Wood, which links into existing adjacent
            woodland, will expand the habitat suitable to dormice and will
            support a recent successful reintroduction programme of this iconic
            species. It is also close to the nationally recognised Aysgarth
            Falls which attracts many visitors each year.
          </Typography.Text>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Text mode="dark">
            Storthwaite and Nethergill Woods in particular will restore woodland
            habitat in sparsely wooded dales. The Wharfedale plantings will
            increase connectivity between existing woodlands and maintain the
            mixed wooded character of this valley.
          </Typography.Text>
        </ContentItemContainer>

        <ContentItemContainer>
          <Typography.Text mode="dark">
            All five projects have unplanted areas creating glades and rides to
            encourage the growth of ground flora and ensure any landscape
            features remain visible to ensure the woodland to reflect the
            structure and composition of other woodland elsewhere. Over time
            there will be minimal felling and coppicing and any cut timber will
            remain on site for the biodiversity benefit it provides.
          </Typography.Text>
        </ContentItemContainer>
      </ContentContainer> */}

          <ContentContainer>
            <ContentItemContainer>
              <Typography.Title mode="dark" level={3}>
                {translator.translate(
                  'modals.projectDescription.sdgBlock.title',
                )}
              </Typography.Title>
            </ContentItemContainer>

            <ContentItemContainer>
              <Typography.Text mode="dark">
                {translator.translate(
                  'modals.projectDescription.sdgBlock.descriptions',
                )}
              </Typography.Text>
            </ContentItemContainer>
          </ContentContainer>

          <ContentContainer style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {renderDevelopmentGoals(project.developmentGoals)}
            {/* <Image source={mockTypeImg1} style={{ width: 85, height: 85 }} />
        <Image source={mockTypeImg2} style={{ width: 85, height: 85 }} />
        <Image source={mockTypeImg3} style={{ width: 85, height: 85 }} /> */}
          </ContentContainer>
          <ContentContainer>
            <Button mode="dark" onPressHandler={goToInviteNotificationScreen}>
              {translator.translate('modals.projectDescription.buttons.share')}
            </Button>
          </ContentContainer>

          <TouchableOpacity onPress={goToInviteNotificationScreen}>
            <ContentContainer style={{ paddingBottom: 0 }}>
              <IconsContainer>
                <IconContainer>
                  <TwitterIcon />
                </IconContainer>

                <IconContainer>
                  <InstagramIcon />
                </IconContainer>

                <IconContainer>
                  <FacebookIcon />
                </IconContainer>

                <IconContainer>
                  <LinkIcon />
                </IconContainer>
              </IconsContainer>
            </ContentContainer>
          </TouchableOpacity>
        </SafeAreaView>
      </Container>
    </View>
  );
}

ProjectInfoModalScreen.defaultProps = defaultProps;
ProjectInfoModalScreen.propTypes = propTypes;
export default pipe(
  partialRight(React.memo, [
    (a, b) => {
      const prevent = pipe(
        pick([
          'category',
          'description',
          'developer',
          'verification',
          'emissionReduction',
          'id',
          'location',
          'name',
          'price',
          'projectType',
          'registrationDate',
          'status',
        ]),
      );
      return equals(prevent(a.project), prevent(b.project));
    },
  ]),
  withLoader,
  withQuery,
)(ProjectInfoModalScreen);
