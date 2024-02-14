import React, { useState } from 'react';
import Container from './components/styled/Container';
import Button from './components/styled/Button';
import FlexStack from './components/styled/FlexStack';
import logo from './assets/logo.png'
import InputEntry from './components/InputEntry';
import { useAppDispatch, useAppSelector } from './store/hook';
import Footer from './components/styled/Footer';
import MarkDialog from './components/MarkDialog';
import { MarkContainer } from './components/MarkContainer';
import { FaCalculator } from "react-icons/fa6";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorMessage from './components/styled/ErrorMessage';
import ResultError from './components/ResultError';
import { ColorRing } from 'react-loader-spinner';
import theme from './theme';
import { calculate } from './store/reducers/average_reducer';
import ConfirmationDialog from './components/ConfirmationDialog';
import ResultContainer from './components/ResultContainer';

function App() {

  const dispatch = useAppDispatch();

  const { show: showMarkDialog } = useAppSelector(store => store.markDialog);
  const marksState = useAppSelector(store => store.mark);

  const { result, error, loading } = useAppSelector(store => store.average);

  const { show: showConfirmationDialog, message, onCancel, onConfirm } = useAppSelector(store => store.confimationDialog)

  const FormValidationSchema = z.object({
    maximum_mark: z.coerce.number().nonnegative().gt(0).lte(999),
    minimum_mark: z.coerce.number().nonnegative().gt(0).lte(999),
    missing_marks: z.coerce.number().nonnegative().gt(0).lte(999),
    average_target: z.coerce.number().nonnegative().gt(0).lte(999),
  });
  type FormValidationSchemaType = z.infer<typeof FormValidationSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValidationSchemaType>({ resolver: zodResolver(FormValidationSchema) })

  const onSubmit: SubmitHandler<FormValidationSchemaType> = async (
    {
      maximum_mark,
      minimum_mark,
      missing_marks,
      average_target
    }
  ) => {
    const marks: number[] = marksState.map((element) => {
      return element.mark;
    });

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);

    await dispatch(
      calculate(
        marks,
        maximum_mark,
        minimum_mark,
        missing_marks,
        average_target
      )
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(async(data) => await onSubmit(data))}>
      <Container>
        <FlexStack 
          align={'center'} 
          justify={'space-evenly'} 
          spacing={20} 
          direction={'column'}
        >
          <img src={logo} alt='logo' style={{padding: '20px'}}/>
          <Container variant='small'>
            <FlexStack
              align={'center'} 
              justify={'space-evenly'} 
              spacing={20} 
              direction={'column'}
            >
              <InputEntry 
                text={'Maximum Mark'} 
                placeholder={'Insert the maximum mark you can get'} 
                hint={'The maximum mark you can get.'}
                number={true}
                {...register('maximum_mark')}
              />
              {errors.maximum_mark && <ErrorMessage>{errors.maximum_mark.message}</ErrorMessage>}
              <InputEntry 
                text={'Minimum Mark'} 
                placeholder={'Insert the minimum mark you can get'} 
                hint={'The minimum mark you need to get to pass a test/exam.'}
                number={true}
                {...register('minimum_mark')}
              />
              {errors.minimum_mark && <ErrorMessage>{errors.minimum_mark.message}</ErrorMessage>}
            </FlexStack>
          </Container>

          <MarkContainer />

          <Container variant='small'>
            <FlexStack
              align={'center'} 
              justify={'space-evenly'} 
              spacing={20} 
              direction={'column'}
            >
              <InputEntry 
                text={'Missing Marks'} 
                placeholder={'Insert the number of missing marks'} 
                hint={'The number of marks you still need to get.'}
                number={true}
                {...register('missing_marks')}
              />
              {errors.missing_marks && <ErrorMessage>{errors.missing_marks.message}</ErrorMessage>}
              <InputEntry 
                text={'Average Target'} 
                placeholder={'Insert your average target'} 
                hint={'Your target average.'}
                number={true}
                {...register('average_target')}
              />
              {errors.average_target && <ErrorMessage>{errors.average_target.message}</ErrorMessage>}
            </FlexStack>
          </Container>
        
          <Button
            type='submit'
            variant='fullsize'
            icon={<FaCalculator />}
          >
            Calculate
          </Button>

          {
            (error || loading || result) &&
            <Container variant='small'> {
            error ? 
              <ResultError>{error}</ResultError> 
            : (
              loading ? 
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={
                    new Array<string>(5)
                      .fill(
                        theme.background.mark_container_box
                      ) as [string, string, string, string, string]
                  }
                />
              :
                result && 
                <ResultContainer result={result} />
            )
            }</Container>
          }

        </FlexStack>
      </Container>
      </form>

      <Footer />

      { showMarkDialog && <MarkDialog /> }

      { 
        showConfirmationDialog && 
        <ConfirmationDialog 
          message={message} 
          onCancel={() => { onCancel && dispatch(onCancel()) }}
          onConfirm={() => { onConfirm && dispatch(onConfirm()) }}
        /> 
      }

    </>
  );
}

export default App;
